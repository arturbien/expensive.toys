import React from "react";
import { Button, Frame } from "react95";
import styled from "styled-components";

const CopyButton = styled(Button)`
  position: absolute;
  right: 2px;
  top: 2px;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin: 1rem 0;

  ${CopyButton} {
    visibility: hidden;
  }
  &:hover {
    ${CopyButton} {
      visibility: visible;
    }
  }
`;
const StyledCode = styled(Frame)`
  width: 100%;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
  padding: 1rem;
`;

const Code = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  const codeRef = React.useRef<null | HTMLElement>(null);

  const onCopy = () => {
    if (codeRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }
  };

  return (
    <Wrapper>
      <StyledCode variant="well">
        <code {...props} ref={codeRef} />
      </StyledCode>
      <CopyButton variant="raised" onClick={onCopy}>
        Copy
      </CopyButton>
    </Wrapper>
  );
};

export default Code;
