import { Frame } from "react95";
import styled from "styled-components";

const DemoFrame = styled(Frame)`
  width: 100%;
  background: ${(p) => p.theme.material};
  /* background: url(https://wallpapers.com/images/hd/windows-95-clouds-kfioe6hnh3x8zn4z.jpg);
  background-size: cover;
  background-attachment: fixed; */
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 42px 0;
`;
const Box = styled.div`
  scroll-snap-align: center;
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 48px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url(data:image/png;base64,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);
  background-blend-mode: multiply;
  -webkit-backdrop-filter: blur(32px) saturate(180%);
  backdrop-filter: blur(32px) saturate(180%);
  outline: 4px solid rgba(255, 255, 255, 0.2);
  outline-offset: -4px;

  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2), 0 7px 10px rgba(0, 0, 0, 0.17);

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    color: white;
    pointer-events: none;
    text-transform: uppercase;
  }
  .icon {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to top,
      #fcc5e4 0%,
      #fda34b 15%,
      #ff7882 35%,
      #c8699e 52%,
      #7046aa 71%,
      #0c1db8 87%,
      #020f75 100%
    );
    background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%);
    mix-blend-mode: color-burn;
  }

  @property --segment-size {
    syntax: "<length>";
    inherits: false;
    initial-value: 0px;
  }

  .blinds {
    --segment-size: 20px;
    mask-image: repeating-linear-gradient(
      to bottom,
      #000000,
      #000000 var(--segment-size),
      transparent var(--segment-size),
      transparent 20px
    );
    transition: --segment-size 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .blinds:hover {
    --segment-size: 0px;
  }

  @property --wipe-position {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 100%;
  }

  .wipe {
    --wipe-position: 100%;
    --gradient-length: 20%;
    -webkit-mask-image: linear-gradient(
      to bottom right,
      black var(--wipe-position),
      transparent calc(var(--wipe-position) + var(--gradient-length)),
      transparent
    );

    transition: --wipe-position 600ms cubic-bezier(0, 0.55, 0.45, 1);
  }

  .wipe:hover {
    --wipe-position: calc(-1 * var(--gradient-length));
  }

  @property --clock-hands-position {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 100%;
  }

  .clock {
    --clock-hands-position: 100%;
    --gradient-length: 30%;
    -webkit-mask-image: conic-gradient(
      black var(--clock-hands-position),
      transparent calc(var(--clock-hands-position) + var(--gradient-length)),
      transparent
    );

    transition: --clock-hands-position 1s ease;
  }
  .clock:hover {
    --clock-hands-position: calc(-1 * var(--gradient-length));
  }

  @property --iris-radius {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 0%;
  }

  @property --iris-gradient-length {
    syntax: "<length> | <percentage>";
    inherits: false;
    initial-value: 0px;
  }

  .iris {
    --iris-radius: 100%;
    --iris-gradient-length: 0px;
    --time: 600ms;

    -webkit-mask-image: radial-gradient(
      black,
      black var(--iris-radius),
      transparent calc(var(--iris-radius) + var(--iris-gradient-length)),
      transparent
    );
    transition: --iris-radius var(--time) cubic-bezier(0, 0.55, 0.45, 1),
      --iris-gradient-length var(--time) ease-out;
  }

  @property --iris-radius {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 0%;
  }

  @property --iris-gradient-length {
    syntax: "<length> | <percentage>";
    inherits: false;
    initial-value: 0px;
  }

  .iris {
    --iris-radius: 100%;
    --iris-gradient-length: 60px;
    --time: 600ms;

    -webkit-mask-image: radial-gradient(
      black,
      black var(--iris-radius),
      transparent calc(var(--iris-radius) + var(--iris-gradient-length)),
      transparent
    );
    transition: --iris-radius var(--time) cubic-bezier(0, 0.55, 0.45, 1),
      --iris-gradient-length var(--time) ease-out;
  }

  .iris:hover {
    --iris-radius: -50%;
    --iris-gradient-length: 0px;
  }
`;

const FancyRevealEffects = ({
  variant,
}: {
  variant: "blinds" | "wipe" | "clock" | "iris";
}) => {
  return (
    <DemoFrame variant="field">
      <Inner>
        <Box>
          <div className={["icon", variant].join(" ")}>
            <span>{variant}</span>
          </div>
        </Box>
      </Inner>
    </DemoFrame>
  );
};

export default FancyRevealEffects;
