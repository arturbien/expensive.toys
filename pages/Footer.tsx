import React from "react";
import { Frame } from "react95";
import eggPlant from "react95/dist/themes/eggPlant";
import styled, { ThemeProvider } from "styled-components";
import EmbossedText from "../components/EmbossedText";
import { Center, Grid } from "../components/Layout";

const StyledFooter = styled(Frame)`
  width: 100%;
  padding: 0;
  padding: 16px 0px;
`;

const Socials = styled.div`
  grid-column: 1 / span 6;
`;

const Links = styled.div`
  grid-column: 8 / span 5;
`;

const Footer = () => {
  return (
    <ThemeProvider theme={eggPlant}>
      <StyledFooter forwardedAs={"footer"}>
        <Center>
          <Grid>
            <EmbossedText text="expensive.toys" />
          </Grid>
        </Center>
      </StyledFooter>
    </ThemeProvider>
  );
};

export default Footer;
