import React from "react";
import { Slider } from "react95";
import { HStack } from "./UI/Stack";

export const SliderControl = ({
  label,
  value,
  getLabelValue,
  ...otherProps
}: {
  label: string;
  getLabelValue?: (value: number) => string;
} & React.ComponentProps<typeof Slider>) => {
  return (
    <HStack
      as="label"
      alignItems="center"
      justifyContent="space-between"
      gap={24}
      pr={24}
    >
      <span style={{ width: 80, flexShrink: 0 }}>{label}</span>
      <HStack alignItems="center" gap={24} fullWidth>
        <span style={{ width: 40, flexShrink: 0 }}>
          {getLabelValue ? getLabelValue(value) : value}
        </span>

        <Slider
          value={value}
          style={{ margin: 0, maxWidth: 500 }}
          {...otherProps}
        />
      </HStack>
    </HStack>
  );
};
