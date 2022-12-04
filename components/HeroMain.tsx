import React from "react";
import { Button, Separator } from "react95";
import styled from "styled-components";
import balloons from "./balloons";
import CTAButton from "./CTAButton";
import { Grid } from "./Layout";
import Monitor from "./Monitor";

const HeroMain = () => {
  return (
    <Wrapper>
      <Grid style={{ alignItems: "center" }}>
        <Monitors>
          <div className="left-monitor">
            <Monitor
              backgroundStyles={{
                backgroundColor: "#dead25",
                backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f5ad18b7-74e3-42a4-a6c3-ed075ba5d058/deoasnn-d8facf28-c859-4e0c-8f45-5a2963c07231.png/v1/fill/w_1280,h_720,q_80,strp/windows_95_clouds_wallpaper___16_9_widescreen_by_malekmasoud_deoasnn-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjVhZDE4YjctNzRlMy00MmE0LWE2YzMtZWQwNzViYTVkMDU4XC9kZW9hc25uLWQ4ZmFjZjI4LWM4NTktNGUwYy04ZjQ1LTVhMjk2M2MwNzIzMS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.qR54NYAZoViO3rTcYcytpri1qyJuPg5MSnDLmhLAsbI)`,
                backgroundSize: "cover",
              }}
            />
          </div>

          <div className="right-monitor">
            <Monitor
              backgroundStyles={{
                backgroundColor: "black",
              }}
            />
          </div>
          <div className="center-monitor">
            <Monitor
              backgroundStyles={{
                background: "#dead25",
                backgroundImage: `url(https://i.pinimg.com/originals/a7/a2/0e/a7a20e9a4c0c5ed6af6cbaf3c268d701.png)`,
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
              }}
            />
          </div>
        </Monitors>
        {/* <BrokenPopup /> */}
        <HeroText>
          <h1>
            Hi, I'm Artur Bień.
            <br /> I build <RainbowText title="quality">
              quality
            </RainbowText>{" "}
            UIs for a hefty salary.
          </h1>
          <Buttons>
            <CTAButton primary onClick={balloons}>
              Read more...
            </CTAButton>
            <CTAButton disabled>Release balloons</CTAButton>
          </Buttons>
        </HeroText>
      </Grid>
    </Wrapper>
  );
};

export default HeroMain;

const Wrapper = styled.div`
  padding: 200px 0;
`;

const HeroText = styled.div`
  grid-column: span 3;
  grid-column: 8 / span 5;
  h1 {
    font-size: 40px;
    line-height: 1.5;
    font-family: "Times New Roman", Times, serif;
    font-family: arial;
    font-weight: bold;
  }
`;
const Buttons = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  button {
    align-self: flex-start;
    min-width: 120px;
  }
`;
const RainbowText = styled.span`
  color: #333;
  /* This is for non-webkit browsers */
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  font: bold 48px "Arial Narrow", sans-serif;

  &:before {
    content: attr(title);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background: -webkit-linear-gradient(
      left,
      rgb(176, 9, 151) 0%,
      rgb(227, 33, 107) 10%,
      rgb(249, 96, 30) 25%,
      rgb(255, 180, 18) 40%,
      rgb(255, 216, 45) 50%,
      rgb(185, 221, 23) 61%,
      rgb(65, 160, 60) 75%,
      rgb(19, 54, 180) 90%,
      rgb(116, 27, 157) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:after {
    content: attr(title);
    position: absolute;
    z-index: 199;
    left: -6px;
    bottom: -10px;
    z-index: 1;
    -webkit-text-fill-color: #000;
    -webkit-transform: skew(40deg, 0deg) scaleY(0.5);
    opacity: 0.3;
  }
`;
const TiltText = styled.span`
  font-family: Arial, sans-serif;
  font-weight: bold;
  background: #390c0b;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodâ€¦IgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=);
  background: -moz-linear-gradient(top, #390c0b 0%, #f6bf28 73%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #390c0b),
    color-stop(73%, #f6bf28)
  );
  background: -webkit-linear-gradient(top, #390c0b 0%, #f6bf28 73%);
  background: -o-linear-gradient(top, #390c0b 0%, #f6bf28 73%);
  background: -ms-linear-gradient(top, #390c0b 0%, #f6bf28 73%);
  background: linear-gradient(to bottom, #390c0b 0%, #f6bf28 73%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#390c0b', endColorstr='#f6bf28', GradientType=0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.01em;
  -webkit-text-stroke: 0.01em #a3a3a3;
`;

const Monitors = styled.div`
  grid-column: 1 / span 7;
  position: relative;
  left: -50px;
  --monitor-width: 300;

  .left-monitor {
    display: inline-block;
    position: absolute;
    transform: scale(0.88);
    -webkit-mask-image: linear-gradient(to right, black, transparent);
    filter: opacity(0.5) brightness(0.2) blur(3px);
  }
  .center-monitor {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    filter: brightness(0.85);
  }
  .right-monitor {
    display: inline-block;
    position: absolute;
    right: 0;
    transform: scale(0.92);
    -webkit-mask-image: linear-gradient(to top left, black, transparent);
    filter: opacity(0.8) brightness(0.2) blur(1px);
  }
`;
