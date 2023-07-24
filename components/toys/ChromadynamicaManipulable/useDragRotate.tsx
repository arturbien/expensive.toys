import React from "react";

type UseDragRotateProps = {
  initialAngle: number;
  ref: React.MutableRefObject<HTMLDivElement>;
};

type UseDragRotateResult = {
  onMouseDown: React.MouseEventHandler;
  onMouseMove: React.MouseEventHandler;
  onMouseUp: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  angle: number;
};

const useDragRotate = ({
  initialAngle = 0,
  ref,
}: UseDragRotateProps): UseDragRotateResult => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startAngle, setStartAngle] = React.useState(initialAngle);
  const [currentAngle, setCurrentAngle] = React.useState(initialAngle);

  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (!isDragging) return;

      const { clientX, clientY } = event;

      const centerX = ref.current!.offsetLeft + ref.current!.offsetWidth / 2;
      const centerY = ref.current!.offsetTop + ref.current!.offsetHeight / 2;

      const angle = Math.atan2(clientY - centerY, clientX - centerX);

      const newAngle = angle - startAngle;
      const normalizedAngle = newAngle < 0 ? newAngle + 2 * Math.PI : newAngle;

      setCurrentAngle(normalizedAngle);
    },
    [isDragging, ref, startAngle]
  );

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, isDragging]);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);

    const { clientX, clientY } = event;

    const centerX = ref.current!.offsetLeft + ref.current!.offsetWidth / 2;
    const centerY = ref.current!.offsetTop + ref.current!.offsetHeight / 2;

    const startAngle = Math.atan2(clientY - centerY, clientX - centerX);

    setStartAngle(startAngle - currentAngle + Math.PI);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return {
    onMouseDown: handleMouseDown,
    onMouseMove: isDragging ? handleMouseMove : undefined,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,

    angle: (currentAngle * 180) / Math.PI,
  };
};

export default useDragRotate;
