import React from "react";
import styled, { ThemeProvider } from "styled-components";
import bg from "../../public/modern-win95-bg.jpg";
import { HStack, VStack } from "../UI/Stack";
import { GlassWidget, MirrorWidget } from "./ReflectiveWidget";
import Widgets, { WidgetsProvider } from "./Widgets";
import Reflections from "./Reflections";
import Windows from "./Windows";
import rose from "react95/dist/themes/rose";

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  /* --os-bg: url(${bg.src}); */
  --os-bg: url(https://msdesign.blob.core.windows.net/wallpapers/Microsoft_Nostalgic_Windows_Wallpaper_4k.jpg);
  /* --os-bg: url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f60e2f5-d224-45fe-ad8c-4c8d6af1eea6/dbqtahe-c48d8bbf-922b-4f2e-8d8f-558ad758b7d6.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRmNjBlMmY1LWQyMjQtNDVmZS1hZDhjLTRjOGQ2YWYxZWVhNlwvZGJxdGFoZS1jNDhkOGJiZi05MjJiLTRmMmUtOGQ4Zi01NThhZDc1OGI3ZDYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ghZ5Az7p5UfeK-jQo1mGUGyT0d0J8TsJNMemNW8z7Fs); */
  /* --os-bg: url(https://images.pling.com/img/00/00/54/79/90/1389010/4919d3c07d0feb71fc3a515bdebf714db39b.jpg); */
  /* --os-bg: url(https://i.ibb.co/whKs6KK/bliss-windows-png.png); */
  /* --os-bg: url(https://cdn.arstechnica.net/wp-content/uploads/2023/06/solitaire-update.jpg); */
  background-size: cover;
  background-image: var(--os-bg);
  /* cursor: none; */
`;

const Layout = () => {
  return (
    <ThemeProvider theme={rose}>
      <WidgetsProvider>
        <Wrapper>
          <Widgets>
            <VStack gap={16} pl={24} pt={64}>
              <HStack gap={16}>
                <GlassWidget
                  width={160}
                  height={160}
                  reflectiveness={10}
                  radius={32}
                ></GlassWidget>
                <MirrorWidget
                  width={160}
                  height={160}
                  reflectiveness={100}
                  radius={32}
                />
              </HStack>
              <HStack gap={16}>
                <MirrorWidget
                  width={336}
                  height={336}
                  reflectiveness={100}
                  radius={16}
                />
              </HStack>
              <HStack gap={16}>
                <GlassWidget
                  width={336}
                  height={160}
                  reflectiveness={10}
                  radius={16}
                />
              </HStack>
            </VStack>
          </Widgets>
          <Reflections />
          <Windows />
        </Wrapper>
      </WidgetsProvider>
    </ThemeProvider>
  );
};

export default Layout;
