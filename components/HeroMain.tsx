import React from "react";
import styled from "styled-components";
import balloons from "./balloons";
import CTAButton, { LinkCTAButton } from "./UI/CTAButton";
import { Grid } from "./Layout";
import Monitor from "./Monitor";
import T from "./UI/Typography";
import { HStack, VStack } from "./UI/Stack";

const HeroMain = () => {
  const removeBalloonsRef = React.useRef<() => void | null>(null);

  const releaseBalloons = () => {
    removeBalloonsRef.current?.();
    removeBalloonsRef.current = balloons();
  };

  React.useEffect(() => {
    return () => removeBalloonsRef.current?.();
  }, []);

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
          <T.H1>
            Hi, I&apos;m Artur Bień.
            <br /> I build <T.Rainbow title="quality">quality</T.Rainbow> UIs
            for fun.
          </T.H1>
          <HStack gap={16}>
            <LinkCTAButton primary href="/blog">
              Read my blog
            </LinkCTAButton>
            <CTAButton onClick={releaseBalloons}>Release balloons</CTAButton>
          </HStack>
        </HeroText>
      </Grid>
    </Wrapper>
  );
};

export default HeroMain;

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  padding-top: 200px;
  padding-bottom: 120px;
  @media only screen and (max-width: 1176px) {
    padding-top: 96px;
  }
  @media only screen and (max-width: 796px) {
    margin-left: 32px;
    margin-right: 32px;
  }
  @media only screen and (max-width: 510px) {
    padding-top: 72px;
  }
`;

const HeroText = styled.div`
  grid-column: 8 / span 5;
  display: flex;
  flex-direction: column;
  gap: 48px;
  @media only screen and (max-width: 1176px) {
    grid-column: 3 / span 8;
    margin-top: 48px;
    gap: 24px;

    align-items: center;
    h1 {
      text-align: center;
    }
  }
  @media only screen and (max-width: 796px) {
    grid-column: 1 / span 12;
  }
  @media only screen and (max-width: 510px) {
    align-items: flex-start;
    h1 {
      text-align: left;
    }
  }
`;

const Monitors = styled.div`
  contain: layout;
  grid-column: 1 / span 7;
  @media only screen and (max-width: 1176px) {
    grid-column: 3 / span 8;
    left: 0;
    --monitor-width: 280;
  }
  @media only screen and (max-width: 796px) {
    grid-column: 1 / span 12;
    left: 0;
    --monitor-width: 280;
  }
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
  @media only screen and (max-width: 678px) {
    .left-monitor {
      left: -70px;
    }
    .right-monitor {
      right: -70px;
    }
  }
  @media only screen and (max-width: 510px) {
    --monitor-width: 220;
    .left-monitor {
      left: -120px;
    }
    .right-monitor {
      right: -120px;
    }
  }
`;
