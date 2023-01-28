import React from "react";
import { Frame } from "react95";
import styled from "styled-components";

const StyledCode = styled(Frame)`
  width: 100%;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
  padding: 1rem;
  margin: 1rem 0;
`;

const Code = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  return (
    <StyledCode variant="well">
      <code {...props} />{" "}
    </StyledCode>
  );
};

export default Code;
