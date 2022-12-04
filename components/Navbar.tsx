import React from "react";
import { Button, Frame } from "react95";
import { createHatchedBackground } from "react95/dist/common";
import original from "react95/dist/themes/original";
import styled, { ThemeProvider } from "styled-components";
import CTAButton from "./CTAButton";
import EmbossedText from "./EmbossedText";
import { Center, Grid } from "./Layout";
import Link from "next/link";
import { useRouter } from "next/router";

const AppBar = styled(Frame)`
  z-index: 2;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 16px 0;
  z-index: 10;
`;

const NavButtons = styled.nav`
  display: flex;
  gap: 8px;
  grid-column: 8 / span 5;
  justify-content: flex-end;
  button {
    height: 50px;
  }
`;

const pages = [
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const router = useRouter();
  console.log({ router });
  return (
    <AppBar variant="window">
      <Center>
        <Grid style={{ alignItems: "center" }}>
          <Link href="/">
            <EmbossedText text="expensive.toys" />
          </Link>

          <NavButtons>
            {pages.map((page) => (
              <Link href={page.href} key={page.name}>
                <CTAButton
                  active={router.pathname === page.href}
                  variant="thin"
                  forwardAs="div"
                >
                  {page.name}
                </CTAButton>
              </Link>
            ))}
          </NavButtons>
        </Grid>
      </Center>
    </AppBar>
  );
};

export default Navbar;
