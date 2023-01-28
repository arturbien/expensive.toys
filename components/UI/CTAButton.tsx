import Link from "next/link";
import React from "react";
import { Button } from "react95";
import styled from "styled-components";

const StyledButton = styled(Button)`
  font-size: 18px;
  height: 60px;
  padding-left: 24px;
  padding-right: 24px;
  flex-shrink: 0;
  :focus {
    ::after {
      outline-offset: -12px;
    }
  }
  @media only screen and (max-width: 1050px) {
    font-size: 16px;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

type Props = Omit<React.ComponentProps<typeof StyledButton>, "size">;

const CTAButton = (props: Props) => {
  return <StyledButton {...props} />;
};

export default CTAButton;

export const LinkCTAButton = ({
  href,
  children,
  ...otherProps
}: {
  href: string;
} & Props) => (
  <Link href={href} passHref>
    <StyledButton forwardedAs="span" {...otherProps}>
      {children}
    </StyledButton>
  </Link>
);
