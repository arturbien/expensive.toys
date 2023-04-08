import React from "react";
import { useTheme } from "styled-components";
import { Highlight } from "../RGBSplitDemo";

export const HighlightChange = ({
  children,
  ...otherProps
}: React.ComponentProps<typeof Highlight>) => {
  const theme = useTheme();
  const ref = React.useRef<null | HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    ref.current.animate(
      [
        { background: "transparent" },
        { background: theme.focusSecondary },
        { background: "transparent" },
      ],
      {
        duration: 400,
        iterations: 1,
      }
    );
  }, [children, theme]);

  return (
    <span style={{ position: "relative" }}>
      <Highlight ref={ref} {...otherProps} />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </span>
  );
};
