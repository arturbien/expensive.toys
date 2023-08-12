import styled, { useTheme } from "styled-components";
import { Frame, Window, WindowContent, WindowHeader } from "react95";
import React from "react";
import { PanInfo, motion, useDragControls } from "framer-motion";

const WindowsLayer = styled.div`
  position: absolute;
  inset: 0;
`;

const Windows = () => {
  return (
    <WindowsLayer>
      <OneWindow />
    </WindowsLayer>
  );
};

export default Windows;

const OneWindow = () => {
  const id = "one";
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const onDrag: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void = (_, info) => {
    const rect = ref.current?.getBoundingClientRect();
    document.body.style.setProperty(`--${id}-x`, rect.left + "px");
    document.body.style.setProperty(`--${id}-y`, rect.top + "px");
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={onDrag}
      // initial={{ x: 400, y: 400 }}
      style={{ display: "inline-block" }}
      ref={ref}
    >
      <Window
        data-window-id={id}
        data-window-color={theme.material}
        shadow={false}
      >
        <WindowHeader>
          <span>My first window</span>
        </WindowHeader>
        <WindowContent>
          <Frame style={{ width: 400, height: 200 }} variant="field"></Frame>
        </WindowContent>
      </Window>
    </motion.div>
  );
};
