import React from "react";
import styled from "styled-components";
import Monitor from "../../components/Monitor";

const Text = styled.h1`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 146px;
  white-space: nowrap;
  font-weight: bold;
  color: ${(p) => p.theme.borderDark};
  color: gold;
  filter: url(#MyFilter);
`;
const Circ = styled.h1`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: 100px solid red;
  filter: url(#MyFilter);
`;

const Button = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  /* background: ${(p) => p.theme.material}; */
  backdrop-filter: blur(10px) saturate(0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  filter: url(#MyFilter) brightness(0.75) contrast(1.5);
`;
const ButtonText = styled.span`
  filter: url(#MyFilter);
  font-size: 120px;
  line-height: 1;
  font-weight: bold;
  color: black;
  padding: 40px;
`;
const EightiesText = () => {
  return (
    <div>
      <svg>
        <defs>
          <filter id="MyFilter" filterUnits="userSpaceOnUse" x="0" y="0">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="5"
              specularConstant=".75"
              specularExponent="20"
              lighting-color="#aaaaaa"
              result="specOut"
            >
              <fePointLight x="-5000" y="-10000" z="20000" />
            </feSpecularLighting>
            <feComposite
              in="specOut"
              in2="SourceAlpha"
              operator="in"
              result="specOut"
            />
            <feComposite
              in="SourceGraphic"
              in2="specOut"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
              result="litPaint"
            />
          </filter>
        </defs>
      </svg>
      <Circ></Circ>
      <Text>Send</Text>
      <Button>
        <ButtonText>Start</ButtonText>
      </Button>
    </div>
  );
};

export default EightiesText;
