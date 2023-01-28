// @ts-nocheck

import {
  balloonDefaultSize,
  createBallonElement,
  svgFiltersHtml,
} from "./balloonSvg";

const easings = [
  // easeOutQuint
  "cubic-bezier(0.22, 1, 0.36, 1)",
  // easeOutCubic
  "cubic-bezier(0.33, 1, 0.68, 1)",
  //   // easeOutCirc
  //   "cubic-bezier(0, 0.55, 0.45, 1)",
];
const colorPairs = [
  // yellow
  ["#ffec37ee", "#f8b13dff"],
  // red
  ["#f89640ee", "#c03940ff"],
  //blue
  ["#3bc0f0ee", "#0075bcff"],
  // green
  ["#b0cb47ee", "#3d954bff"],
  // purple
  ["#cf85b8ee", "#a3509dff"],
];

function releaseBalloons() {
  const style = document.createElement("style");
  style.innerHTML = `
  balloons {
    --perspective-origin-x: 50vw;
    --perspective-origin-y: 100vh;

    overflow: hidden;
    position: fixed;
    inset: 0;
    z-index: 999;
    display: inline-block;
    pointer-events: none;
    -webkit-perspective: 1500px;
    perspective: 1500px;
    perspective-origin: var(--perspective-origin-x)
      var(--perspective-origin-y);

    contain: style, layout, paint;

  }
  balloon {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    isolation: isolate;

    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    /* The lines below might be significant for performance  */
    /* but break perspectiev in Firefox... */
    /* -webkit-backface-visibility: hidden;
    backface-visibility: hidden; */

    /* This part is important. In Safari we need to first render
    all balloons in the viewport briefly before we start animating them
    otherwise balloons will render mid animation
    Balloons have to be prerendered within the viewport (hence the +1px trick)
    and can not be compeltely transparent (hence the 0.001 trick) */
    opacity: 0.001;
    transform: translate(calc(-100% + 1px), calc(-100% + 1px));
    contain: style, layout, paint;
    /* Validate if will-change helps here  */
    will-change: transform;

  }
  `;
  const balloonsContainer = document.createElement("balloons");
  document.documentElement.appendChild(style);
  document.documentElement.appendChild(balloonsContainer);

  const sceneSize = { width: window.innerWidth, height: window.innerHeight };
  // make balloon height relative to screen size for this nice bokeh/perspective effect
  const balloonHeight = Math.floor(sceneSize.height * 1);

  const balloonWidth =
    (balloonDefaultSize.width / balloonDefaultSize.height) * balloonHeight;
  let amount = Math.max(5, Math.round(window.innerWidth / (balloonWidth / 2)));
  // make max dist depend on number of balloons and their size for realistic effect
  // we dont want them to be too separated or too squeezed together
  const maxDist = Math.max(
    (amount * balloonWidth) / 2,
    (balloonWidth / 2) * 10
  );

  type BallonPosition = {
    x: number;
    y: number;
    z: number;
    targetX: number;
    targetY: number;
    targetZ: number;
  };

  let balloonPositions: BallonPosition[] = [];

  for (let i = 0; i < amount; i++) {
    const x = Math.round(sceneSize.width * Math.random());
    // make sure ballons first render below the bottom of the screen
    const y = window.innerHeight;
    const z = Math.round(-1 * (Math.random() * maxDist));

    const targetX = Math.round(
      x + Math.random() * balloonWidth * 6 * (Math.random() > 0.5 ? 1 : -1)
    );
    const targetY = -window.innerHeight;
    // balloons don't move in the Z direction
    const targetZ = z;
    balloonPositions.push({
      x,
      y,
      z,
      targetX,
      targetY,
      targetZ,
    });
  }

  balloonPositions = balloonPositions.sort((a, b) => a.z - b.z);
  const closestBallonPosition = balloonPositions[balloonPositions.length - 1];
  const farthestBallonPosition = balloonPositions[0];
  console.log({ closestBallonPosition, farthestBallonPosition });
  balloonPositions = balloonPositions.map((pos) => ({
    ...pos,
    z: pos.z - closestBallonPosition.z,
    targetZ: pos.z - closestBallonPosition.z,
  }));

  const filtersElement = document.createElement("div");
  filtersElement.innerHTML = svgFiltersHtml;
  balloonsContainer.appendChild(filtersElement);

  const animations = balloonPositions.map((pos) => {
    const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];

    const balloon = createBalloon({
      width: balloonWidth,
      colors: colorPair,
    });
    balloonsContainer.appendChild(balloon);

    return createBalloonAnimation({
      balloon,
      ...pos,
    });
  });
  // Wait a bit for the balloon prerender
  requestAnimationFrame(() => {
    animations.forEach((animation) => {
      const a = animation();
      a.onfinish = removeParticle;
    });
  });
}

let zIndex = 1;

function createBalloon({ width, colors }: { width: number; colors: string[] }) {
  const balloon = createBallonElement({
    balloonColor: colors[1],
    lightColor: colors[0],
    width,
  });

  return balloon;
}

function createBalloonAnimation({
  balloon,
  x,
  y,
  z,
  targetX,
  targetY,
  targetZ,
}: {
  balloon: HTMLElement;
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
}) {
  balloon.style.zIndex = zIndex.toString();
  zIndex += 1;
  return () =>
    balloon.animate(
      [
        {
          transform: `translate(-50%, 0%) translate3d(${x}px, ${y}px, ${z}px)`,
          opacity: 1,
        },
        {
          transform: `translate(-50%, 0%) translate3d(${targetX}px, ${
            y + targetY * 5
          }px, ${targetZ}px)`,
          opacity: 1,
        },
      ],
      {
        duration: (Math.random() * 1000 + 5000) * 5,
        easing: easings[Math.floor(Math.random() * easings.length)],
        delay: Math.random() * 200,
      }
    );
}

function removeParticle(e) {
  e.srcElement.effect.target.remove();
}

export default releaseBalloons;
