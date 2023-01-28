import React from "react";
import { Frame } from "react95";
import eggplant from "react95/dist/themes/eggplant";
import styled, { ThemeProvider } from "styled-components";
import { Center, Grid } from "./Layout";
import { ExpensiveToys } from "./UI/Typography";

const StyledFooter = styled(Frame)`
  width: 100%;
  padding: 0;
  padding: 16px 0px;
  position: sticky;
  top: 100vh;

  @media only screen and (max-width: 1176px) {
    padding: 16px;
  }
`;

const Socials = styled.div`
  grid-column: 1 / span 6;
`;

const Links = styled.div`
  grid-column: 8 / span 5;
`;

const Footer = () => {
  return (
    <ThemeProvider theme={eggplant}>
      <StyledFooter forwardedAs={"footer"}>
        <Center>
          <Grid>
            <ExpensiveToys />
          </Grid>
        </Center>
      </StyledFooter>
    </ThemeProvider>
  );
};

export default Footer;
