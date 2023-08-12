import React from "react";
import styled from "styled-components";
import bg from "../../public/modern-win95-bg.jpg";
import { HStack, VStack } from "../UI/Stack";
import OSWidget from "./OSWidget";
import Widgets, { WidgetsProvider } from "./Widgets";
import Reflections from "./Reflections";
import Windows from "./Windows";

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(${bg.src});
  background-size: cover;
`;

const Layout = () => {
  return (
    <WidgetsProvider>
      <Wrapper>
        <Widgets>
          <VStack gap={16} pl={24} pt={64}>
            <HStack gap={16}>
              <OSWidget radius={32} />
              <OSWidget radius={32} />
            </HStack>
            <HStack gap={16}>
              <OSWidget radius={16} />
              <OSWidget radius={8} />
            </HStack>
          </VStack>
        </Widgets>
        <Reflections />
        <Windows />
      </Wrapper>
    </WidgetsProvider>
  );
};

export default Layout;
