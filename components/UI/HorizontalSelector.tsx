import * as RadioGroup from "@radix-ui/react-radio-group";
import React from "react";
import { ScrollView } from "react95";
import styled from "styled-components";

const Group = styled(RadioGroup.Root)`
  display: flex;
  gap: 0;
`;
const Item = styled(RadioGroup.Item)`
  all: unset;
  padding: 16px;
  flex-shrink: 0;
  font-size: 48px;
  line-height: 1;
  &[data-state="checked"] {
    background: ${(p) => p.theme.hoverBackground};
  }
  &:focus-visible {
    outline: 2px dashed ${(p) => p.theme.focusSecondary};
    outline-offset: -2px;
  }
`;
const HorizontalSelector = ({
  items,
  selectedItem,
  ...otherProps
}: {
  items: string[];
  selectedItem: string;
} & React.ComponentProps<typeof Group>) => {
  return (
    <ScrollView>
      <Group {...otherProps}>
        {items.map((item) => (
          <Item key={item} value={item} checked={selectedItem === item}>
            {item}
          </Item>
        ))}
      </Group>
    </ScrollView>
  );
};

export default HorizontalSelector;
