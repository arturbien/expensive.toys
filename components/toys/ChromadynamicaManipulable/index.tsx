import React from "react";
import ChromadynamicaManipulable from "./ChromadynamicaManipulable";
import { HStack } from "../../UI/Stack";

const index = () => {
  return (
    <HStack mb={64} mt={32} justifyContent="center">
      <ChromadynamicaManipulable />
    </HStack>
  );
};

export default index;
