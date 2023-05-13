import React from "react";
import ChromadynamicaManipulable, {
  Gradient39,
  Gradient3,
  Gradient1,
  Gradient2,
} from "./ChromadynamicaManipulable";
import { HStack, VStack } from "../../UI/Stack";
import DancingPeople from "./DancingPeople";

const index = () => {
  return (
    <VStack
      gap={64}
      mb={64}
      mt={32}
      justifyContent="center"
      alignItems="center"
    >
      <ChromadynamicaManipulable BackgroundComponent={Gradient2} />
      <ChromadynamicaManipulable BackgroundComponent={Gradient1} />
      <ChromadynamicaManipulable BackgroundComponent={Gradient3} />
      <ChromadynamicaManipulable BackgroundComponent={Gradient39} />
      {/* <DancingPeople /> */}
    </VStack>
  );
};

export default index;
