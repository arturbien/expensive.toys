import React from "react";
import styled from "styled-components";
import useDragRotate from "./useDragRotate";
import { Draggable } from "gsap/dist/Draggable";
import gsap from "gsap";
import useSound from "use-sound";
import useResizeObserver from "use-resize-observer";
import { serialize } from "v8";

gsap.registerPlugin(Draggable);

const Center = styled.div`
  flex-shrink: 0;
  contain: strict;
  isolation: isolate;
  width: auto;
  height: auto;
  display: grid;
  width: 100%;
  max-width: 500px;
  width: 360px;
  height: 360px;
  aspect-ratio: 1 / 1;
  align-content: stretch;
  justify-content: stretch;

  filter: drop-shadow(6.8px 13.6px 5.6px hsl(0deg 0% 0% / 0.29));
`;
const Wheel = styled.div<{ sizeRatio: number }>`
  transform: rotate(0deg);
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

  --border-width: 1px;
  --edge-width: 4px;
  border: var(--border-width) solid black;

  &::before,
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0;
    border-radius: inherit;
  }
  &:before {
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.35),
      rgba(0, 0, 0, 0.45)
    );
    padding: 1px;
    -webkit-mask: linear-gradient(black, black) content-box content-box,
      linear-gradient(black, black);
    -webkit-mask-composite: xor;
    border-radius: inherit;
  }
  &:after {
    inset: -2px;
    background: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.45),
      rgba(255, 255, 255, 0.35)
    );
    -webkit-mask: linear-gradient(black, black) content-box content-box,
      linear-gradient(black, black);
    -webkit-mask-composite: xor;
    border-radius: inherit;
    padding: 1px;
  }
  /* overflow: hidden; */
`;

const Background = styled.div<{ size?: number }>`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  contain: strict;
  isolation: isolate;
`;

const W = styled.div<{ size: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(p) => p.size + "px"};
  height: ${(p) => p.size + "px"};
  transform: translate(-50%, -50%);
`;
const Circle = styled.div<{ rotation?: number; color: string }>`
  position: absolute;
  width: 50%;
  height: 50%;
  border-radius: 999px;
  top: 0;
  left: 50%;
  transform: rotate(${(p) => p.rotation || 0}deg) translate(-50%, 0);
  transform-origin: 0 100%;
  background: ${(p) => p.color};
  filter: blur(30px);
  mix-blend-mode: multiply;
`;

export const Gradient2 = ({
  style,
  ...otherProps
}: React.ComponentProps<typeof Background>) => {
  return (
    <Background style={{ ...style, background: "white" }}>
      <W {...otherProps}>
        <Circle color="yellow" />
        <Circle color="magenta" rotation={120} />
        <Circle color="blue" rotation={180} />
        {/* <Red />
        <Blue /> */}
      </W>
    </Background>
  );
};
export const Gradient3 = styled(Background)`
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${(p) => p.size + "px"};
    height: ${(p) => p.size + "px"};
    transform: translate(-50%, -50%);

    background-image: url(https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg);
    background-size: 600px 600px;
    background-position: center;
    background-image: linear-gradient(
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
    background-blend-mode: soft-light;
  }
`;
export const Gradient1 = styled(Background)`
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${(p) => p.size + "px"};
    height: ${(p) => p.size + "px"};
    transform: translate(-50%, -50%);

    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 700 700' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"),
      url(https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg);
    background-size: cover;
    background-position: center;

    background-blend-mode: soft-light;
  }
`;
export const Gradient39 = styled(Background)`
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
  background-blend-mode: soft-light;
`;
const DragHandle = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
`;
type Props = {
  steps?: number;
  BackgroundComponent: typeof Background;
};
const ChromadynamicaManipulable = ({
  steps = 7,
  BackgroundComponent,
}: Props) => {
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

  const { ref: roRef, width: size } = useResizeObserver<HTMLDivElement>();

  return (
    <Center ref={roRef}>
      <Segment
        steps={steps}
        angle={angle}
        size={size}
        BackgroundComponent={BackgroundComponent}
      />
      <DragHandle ref={ref} />
    </Center>
  );
};

export default ChromadynamicaManipulable;

const Segment = ({
  steps,
  step = 0,
  children,
  angle: angleProp,
  BackgroundComponent,
  size,
  ...otherProps
}: React.ComponentProps<typeof Wheel> & {
  step?: number;
  steps: number;
  angle?: number;
  size: number;
  BackgroundComponent: typeof Background;
}) => {
  const parentAngle = useAngle();
  const [angle, setAngle] = React.useState(0);
  const isStickingRef = React.useRef(false);
  const [play] = useSound("https://ui.gallery/click_06.wav", {
    forceSoundEnabled: true,
    playbackRate: 8,
  });

  React.useLayoutEffect(() => {
    if (parentAngle) {
      setAngle((angle) => {
        if (parentAngle >= angle + 15) {
          if (!isStickingRef.current) {
            play();
          }
          isStickingRef.current = true;
          return parentAngle - 15;
          //   console.log("SWAG");
        } else if (parentAngle - angle <= 0) {
          if (!isStickingRef.current) {
            play();
          }
          isStickingRef.current = true;

          return parentAngle;
        }
        isStickingRef.current = false;

        return angle;
      });
    }
  }, [parentAngle, play]);

  const stepSize = 1 / steps;
  const sizeRatio = 1 - step * stepSize;

  const resultAngle = angleProp !== undefined ? angleProp : angle;

  return (
    <>
      <Wheel
        sizeRatio={sizeRatio}
        style={{
          overflow: step === 0 ? "hidden" : undefined,
        }}
      >
        <BackgroundComponent
          size={size}
          style={{ transform: `rotate(${resultAngle}deg)` }}
        />

        {/* <Gradient style={{ transform: `rotate(${resultAngle}deg)` }} /> */}
      </Wheel>

      {step < steps - 1 ? (
        <AngleContext.Provider value={resultAngle}>
          <Segment
            steps={steps}
            step={step + 1}
            sizeRatio={sizeRatio}
            size={size}
            BackgroundComponent={BackgroundComponent}
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
