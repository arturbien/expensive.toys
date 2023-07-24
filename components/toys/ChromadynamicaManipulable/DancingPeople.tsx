import React from "react";
import styled from "styled-components";
import useDragRotate from "./useDragRotate";
import { Draggable } from "gsap/dist/Draggable";
import gsap from "gsap";

gsap.registerPlugin(Draggable);

const Center = styled.div`
  overflow: hidden;
  contain: layout;
  isolation: isolate;
  width: auto;
  height: auto;
  display: grid;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1;
  align-content: stretch;
  justify-content: stretch;

  /* &:after {
    content: "";
    position: absolute;
    inset: 0;
    filter: url(#noiseFilter);
    mix-blend-mode: soft-light;
  } */
  svg {
    display: none;
  }
  filter: drop-shadow(6.8px 13.6px 5.6px hsl(0deg 0% 0% / 0.29));
`;
const Wheel = styled.div<{ sizeRatio: number }>`
  transform: rotate(var(--angle, 0deg));
  --ang: clamp(0deg, var(--angle), calc(var(--angle) * var(--index)));
  transform: rotate(calc(var(--angle) * var(--index))) rotate(var(--ang, 0deg));
  grid-area: 1 / 1;
  align-self: center;
  justify-self: center;
  width: 100%;
  --radius: calc(100% * ${(p) => p.sizeRatio});

  position: relative;

  width: var(--radius);
  height: var(--radius);
  display: grid;
  justify-content: center;
  align-content: center;
  border-radius: 50%;

  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 700 700' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"),
    conic-gradient(
      #010101,
      #3a045e,
      #2527ba,
      #48a1f9,
      #73f7fe,
      #e2fde5,
      #fcfffe,
      #f8df5e,
      #e84537,
      #7e1858,
      #010101,
      #39047a,
      #2e21d7,
      #3f8ff6,
      #acfd55,
      #d5c240,
      #ea4425,
      #d12f2a,
      #6c125d,
      #010101,
      #2930dd,
      #61cffb,
      #f7ffff,
      #fefd55,
      #e83c22,
      #4a0b31,
      #010101
    );
  background: url(https://www.pngplay.com/wp-content/uploads/8/People-Standing-Transparent-PNG.png);
  background-size: 600px 600px;
  background-position: center;
  background-blend-mode: soft-light;
  --border-width: 0.5px;
  --edge-width: 4px;
  &::before,
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  /* &:before {
    border: var(--border-width) solid black;
  } */
  /* &:after {
    background: linear-gradient(135deg, white, black);
    --gradient-end: calc(
      var(--radius) / 2 - var(--edge-width) - var(--border-width)
    );
    mask-image: radial-gradient(
      circle at center,
      transparent var(--gradient-end),
      black var(--gradient-end)
    );
    mix-blend-mode: soft-light;
  } */
  & > & {
    transform: rotate(15deg) scale(0.7);
    transform-origin: center;
  }
`;
const DragHandle = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
`;
type Props = {
  steps?: number;
};
const ChromadynamicaManipulable39 = ({ steps = 7 }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [angle, setAngle] = React.useState(0);

  React.useEffect(() => {
    const drag = Draggable.create(ref.current, {
      type: "rotation",
      inertia: true,
      onDrag: function () {
        setAngle(this.rotation);
      },
      onThrowUpdate: function () {
        setAngle(this.rotation);
      },
    });
  }, []);

  return (
    <Center>
      <svg aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="6.29"
            numOctaves="6"
            stitchTiles="stitch"
          ></feTurbulence>
        </filter>
        <filter id="noiseFilter2">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>

      <Segment steps={10} angle={angle} />
      <DragHandle ref={ref} />
    </Center>
  );
};

export default ChromadynamicaManipulable39;

const Segment = ({
  steps,
  step = 0,
  children,
  angle: angleProp,
  ...otherProps
}: React.ComponentProps<typeof Wheel> & {
  step?: number;
  steps: number;
  angle?: number;
}) => {
  const parentAngle = useAngle();
  const [angle, setAngle] = React.useState(0);

  React.useEffect(() => {
    if (parentAngle) {
      setAngle((angle) => {
        if (parentAngle >= angle + 15) {
          return parentAngle - 15;
          //   console.log("SWAG");
        } else if (parentAngle - angle <= 0) {
          return parentAngle;
        }
        return angle;
      });
    }
  }, [parentAngle]);

  const stepSize = 1 / steps;
  const sizeRatio = 1 - step * stepSize;

  // const resultAngle = angleProp !== undefined ? angleProp : angle;
  const resultAngle = angleProp;

  return (
    <>
      <Wheel
        style={
          {
            // transform: `rotate(${resultAngle}deg)`,
            "--angle": `${angleProp}deg`,
            "--index": step,
          } as React.CSSProperties
        }
        sizeRatio={sizeRatio}
      />
      {step < steps - 1 ? (
        <AngleContext.Provider value={angleProp}>
          <Segment
            steps={steps}
            step={step + 1}
            sizeRatio={sizeRatio}
            angle={angleProp}
          />
        </AngleContext.Provider>
      ) : null}
    </>
  );
};

// React context for storing angle value

const AngleContext = React.createContext(0);

const useAngle = () => {
  const context = React.useContext(AngleContext);
  if (context === undefined) {
    throw new Error("useAngle must be used within a AngleProvider");
  }
  return context;
};

const AngleProvider = ({ children }: { children: React.ReactNode }) => {
  const [angle, setAngle] = React.useState(0);
  return (
    <AngleContext.Provider value={angle}>{children}</AngleContext.Provider>
  );
};
