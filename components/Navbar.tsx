import React from "react";
import { Frame } from "react95";
import { createHatchedBackground } from "react95/dist/common";
import original from "react95/dist/themes/original";
import styled, { ThemeProvider } from "styled-components";
import { Grid, Center, Wide } from "./Layout";

const AppBar = styled(Frame)`
  z-index: 2;
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 10;
`;

const EmbossedText = styled.div`
  grid-column: 1 / span 10;
  position: relative;
  display: inline-block;
  font-size: 28px;
  font-weight: bold;
  color: ${(p) => p.theme.borderDark};
  text-shadow: -1px -1px 0px ${(p) => p.theme.materialText},
    1px 1px 0px ${(p) => p.theme.borderLightest};
  font-style: italic;
  transform: translateY(16px);
  #overlay {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    ${(p) =>
      createHatchedBackground({
        mainColor: p.theme.material,
        pixelSize: 1,
      })}
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: none;
  }
`;
const Navbar = () => {
  return (
    <AppBar variant="window">
      <Grid>
        <EmbossedText>
          <div id="behind">expensive.toys</div>
          <div id="overlay">expensive.toys</div>
        </EmbossedText>
      </Grid>
    </AppBar>
  );
};

export default Navbar;
