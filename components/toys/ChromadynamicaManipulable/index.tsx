import React from "react";
import { Frame, NumberInput, Select, Slider } from "react95";
import { HStack, VStack } from "../../UI/Stack";
import ChromadynamicaManipulable, {
  Background,
  Gradient1,
  Gradient2,
  Gradient3,
  Gradient39,
} from "./ChromadynamicaManipulable";

type Gradients = "CM-39" | "X" | "Blobs" | "Windows";

const backgroundOptions: Record<Gradients, typeof Background> = {
  "CM-39": Gradient39,
  X: Gradient3,
  // @ts-expect-error
  Blobs: Gradient2,
  Windows: Gradient1,
};

const ChromadynamicaManipulableDemo = () => {
  const [background, setBackground] = React.useState<Gradients>("CM-39");
  const [steps, setSteps] = React.useState(7);
  const [angle, setAngle] = React.useState(15);

  const currentBackground = backgroundOptions[background];
  return (
    <VStack
      mt={64}
      justifyContent="center"
      alignItems="center"
      ml={-16}
      mr={-16}
    >
      <Frame style={{ width: "100%", padding: 8, zIndex: 1 }}>
        <HStack gap={8} alignItems="center">
          <Select
            tabIndex={0}
            options={Object.keys(backgroundOptions).map((key) => ({
              value: key,
              label: key,
            }))}
            value={background}
            onChange={(e) => setBackground(e.value as Gradients)}
            width={200}
          />
          <NumberInput
            value={steps}
            min={3}
            max={10}
            onChange={(value) => setSteps(value)}
            width={70}
            style={{ flexShrink: 0 }}
          />
          <HStack
            alignItems="center"
            justifyContent="space-around"
            gap={20}
            fullWidth
            pr={4}
            ml={12}
          >
            <Slider
              value={angle}
              min={6}
              max={36}
              step={1}
              onChange={(value) => setAngle(value)}
              style={{
                marginBottom: 0,
                marginTop: 2,
              }}
            />
            <span style={{ width: 28, flexShrink: 0, textAlign: "right" }}>
              {angle}°
            </span>
          </HStack>
        </HStack>
      </Frame>
      <Frame
        variant="status"
        style={{ width: "100%", padding: 0, marginTop: -4, marginBottom: 64 }}
      >
        <VStack
          justifyContent="center"
          alignItems="center"
          pt={40}
          pb={40}
          style={{ overflow: "hidden" }}
        >
          <ChromadynamicaManipulable
            steps={steps}
            angleOffset={angle}
            BackgroundComponent={currentBackground}
          />
        </VStack>
      </Frame>
    </VStack>
  );
};

export default ChromadynamicaManipulableDemo;
