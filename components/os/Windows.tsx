import { PanInfo, motion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom";
import { Window, WindowContent, WindowHeader } from "react95";
import styled from "styled-components";
import img from "../../public/profile-pic.jpeg";
import { Cursor } from "./Cursor";

const WindowsLayer = styled.div`
  position: absolute;
  inset: 0;
`;

const Windows = () => {
  const [windows, setWindows] = React.useState([
    { id: "swag", component: OneWindow },
    // { id: "testing", component: OneWindow },
    { id: "img", component: Img },
    // ...more windows
  ]);

  const focusWindow = (id: string) => {
    const updatedWindows = [
      ...windows.filter((window) => window.id !== id),
      windows.find((window) => window.id === id),
    ];
    setWindows(updatedWindows);
  };

  const closeWindow = (id: string) => {
    const updatedWindows = windows.filter((window) => window.id !== id);
    setWindows(updatedWindows);
  };

  // // Use effect that attaches mouse move listener and setting --mouse-x and --mouse-y on body
  // React.useEffect(() => {
  //   document.body.addEventListener("mousemove", (e) => {
  //     console.log(e.clientX);
  //     document.body.style.setProperty("--mouse-x", e.clientX + "px");
  //     document.body.style.setProperty("--mouse-y", e.clientY + "px");
  //   });
  // }, []);

  return (
    <WindowsLayer>
      {windows.map((window, index) => {
        return (
          <Application
            id={window.id}
            key={window.id}
            focused={index === windows.length - 1}
            index={index}
            // onClose={() => closeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            // @ts-expect-error
            component={window.component}
            reflectionzIndex={windows.length - 1 - index}
          />
        );
      })}
      {/* <Cursor /> */}
    </WindowsLayer>
  );
};

export default Windows;

const Draggable = styled(motion.div)<{ focused?: boolean }>`
  & > * {
    box-shadow: ${(p) =>
      p.focused
        ? `0px 0px 2.2px rgba(0, 0, 0, 0.053),
      0px 0px 5.3px rgba(0, 0, 0, 0.077), 0px 0px 9.9px rgba(0, 0, 0, 0.095),
      0px 0px 17.6px rgba(0, 0, 0, 0.113), 0px 0px 33px rgba(0, 0, 0, 0.137),
      0px 0px 79px rgba(0, 0, 0, 0.19);`
        : "none"};
  }
`;

const Portal = ({
  children,
  portalId,
}: {
  children: React.ReactNode;
  portalId: string;
}) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? ReactDOM.createPortal(children, document.querySelector(portalId))
    : null;
};

const Application = ({
  id,
  focused,
  onFocus,
  index,
  component,
  initialPosition = { x: 400, y: 400 },
  reflectionzIndex,
}: {
  id: string;
  focused: boolean;
  onFocus: () => void;
  index: number;
  component: (() => JSX.Element) & {
    Shadow: () => JSX.Element;
  };
  initialPosition?: { x: number; y: number };
  reflectionzIndex: number;
}) => {
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const shadowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, [mounted]);

  React.useLayoutEffect(() => {
    if (!mounted || !shadowRef.current) return;
    shadowRef.current.style.setProperty(`--x`, initialPosition.x + "px");
    shadowRef.current.style.setProperty(`--y`, initialPosition.y + "px");
  }, [mounted, initialPosition.x, initialPosition.y]);

  const onDrag: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void = (_, info) => {
    const rect = ref.current?.getBoundingClientRect();
    shadowRef.current.style.setProperty(`--x`, rect.left + "px");
    shadowRef.current.style.setProperty(`--y`, rect.top + "px");
  };

  const Component = component;
  return (
    <>
      <Draggable
        drag
        dragMomentum={false}
        onDrag={onDrag}
        onMouseDown={onFocus}
        initial={initialPosition}
        style={{ display: "inline-block" }}
        ref={ref}
        focused={focused}
      >
        <Component />
      </Draggable>
      <Portal portalId="#reflections-portal">
        <Component.Shadow
          // @ts-expect-error
          ref={shadowRef}
          style={{ zIndex: reflectionzIndex }}
        />
      </Portal>
    </>
  );
};

const Shape = styled.div`
  position: absolute;
  width: 320px;
  height: 200px;
`;

const OneWindow = () => {
  return (
    <Shape>
      <Window
        shadow={false}
        style={{ width: "100%", height: "100%" }}
        id="haha"
      >
        <WindowHeader>
          <span>Reflections.exe</span>
        </WindowHeader>
        <WindowContent>
          {/* <Frame style={{ width: 400, height: 200 }} variant="field"></Frame> */}
        </WindowContent>
      </Window>
    </Shape>
  );
};

const OneReflection = styled(Shape)`
  transform: translate3d(var(--x), var(--y), -100px);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${(p) => p.theme.material};
    /* filter: blur(1px) opacity(0.2); */
  }
  /* &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: black;
    box-shadow: 0px 0px 2.2px rgba(0, 0, 0, 0.053),
      0px 0px 5.3px rgba(0, 0, 0, 0.077), 0px 0px 9.9px rgba(0, 0, 0, 0.095),
      0px 0px 17.6px rgba(0, 0, 0, 0.113), 0px 0px 33px rgba(0, 0, 0, 0.137),
      0px 0px 79px rgba(0, 0, 0, 0.19);
  } */
`;

// eslint-disable-next-line react/display-name
OneWindow.Shadow = OneReflection;

const ImgShape = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 32px;
  /* overflow: hidden; */
`;

const Img = () => {
  return (
    <ImgShape
      style={{
        backgroundImage: `url(${img.src})`,
      }}
    />
  );
};
const ImgReflection = styled(ImgShape)`
  transform: translate3d(var(--x), var(--y), -100px);
  background-image: url(${img.src});
  background-size: cover;
  background-position: center;
  background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Kodak_Paper.jpg/1200px-Kodak_Paper.jpg);
  /* transform-origin: 50vw 50vh; */
`;
// eslint-disable-next-line react/display-name
Img.Shadow = ImgReflection;
