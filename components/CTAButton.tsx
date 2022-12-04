import React from "react";
import { Button } from "react95";
import styled from "styled-components";

const StyledButton = styled(Button)`
  font-size: 18px;
  height: 60px;
  padding-left: 24px;
  padding-right: 24px;

  :focus {
    ::after {
      outline-offset: -12px;
    }
  }
`;

type Props = Omit<React.ComponentProps<typeof StyledButton>, "size">;

const CTAButton = (props: Props) => {
  return <StyledButton {...props} />;
};

export default CTAButton;
