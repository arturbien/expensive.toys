import React from "react";
import styled from "styled-components";

type Rect = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  radius: number;
  reflectiveness: number;
};
// React context to store all widgets rects and a hook to set and get them
const WidgetsContext = React.createContext<{
  rects: Rect[];
  setRects: (rects: Rect[]) => void;
}>({
  rects: [],
  setRects: () => {},
});
export const useWidgets = () => React.useContext(WidgetsContext);

export const WidgetsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rects, setRects] = React.useState<Rect[]>([]);
  return (
    <WidgetsContext.Provider
      value={{
        rects,
        setRects,
      }}
    >
      {children}
    </WidgetsContext.Provider>
  );
};

const WidgetsLayer = styled.div`
  position: absolute;
  inset: 0;
`;

const Widgets = (props: React.ComponentProps<typeof WidgetsLayer>) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { setRects } = useWidgets();

  // create a CSS mask with the shape of rounded corner rectangle from each rect

  React.useLayoutEffect(() => {
    const widgets = ref.current?.querySelectorAll("[data-reflective]");
    if (widgets) {
      const rects = Array.from(widgets).map((widget) => {
        const rect = widget.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
          radius: parseInt(widget.getAttribute("data-radius") || "0"),
          reflectiveness: parseInt(
            widget.getAttribute("data-reflectiveness") || "0"
          ),
        };
      });
      setRects(rects);
    }
  }, [setRects]);

  return <WidgetsLayer ref={ref} {...props} />;
};

export default Widgets;
