import React from "react";
import { Frame } from "react95";
import styled from "styled-components";
import HorizontalSelector from "../../UI/HorizontalSelector";
import { HStack, VStack } from "../../UI/Stack";
import { PuffySticker, Sticker } from "./Stickers";

const emojis = [
  "👻",
  "🎃",
  "🧠",
  "🍔",
  "☠️",
  "🤑",
  "🤡",
  "💩",
  "🧸",
  "🙏",
  "📎",
  "🍩",
];
const Workspace = styled.div`
  background: ${(p) => p.theme.canvas};
  background-image: radial-gradient(
    ${(p) => p.theme.canvasText} 1px,
    transparent 0
  );
  background-size: 40px 40px;
  overflow: auto;
  touch-action: manipulation;
`;
const Ruler = styled.div`
  position: relative;
  display: flex;

  height: 40px;
  background: ${(p) => p.theme.material};

  background-repeat: repeat-x;
  border-bottom: 2px solid ${(p) => p.theme.borderDarkest};
  box-shadow: inset 0px -2px 0px 0px ${(p) => p.theme.borderDark};

  --tick-color: ${(p) => p.theme.materialText};
  --tick-width: 2px;
  --spacing: 60px;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 2px;
    right: 0;
    background: linear-gradient(
        90deg,
        var(--tick-color) var(--tick-width),
        transparent 0
      )
      calc(-1 * var(--tick-width) / 2) / var(--spacing);
    height: 12px;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 2px;
    right: 0;
    background: linear-gradient(
        90deg,
        var(--tick-color) var(--tick-width),
        transparent 0
      )
      calc(-1 * var(--tick-width) / 2) / calc(var(--spacing) / 5);
    height: 6px;
  }
`;

const Demo = () => {
  const [selectedEmoji, setSelectedEmoji] = React.useState(emojis[0]);
  const [slowMotion, setSlowMotion] = React.useState(false);

  const selectedEmojiIndex =
    emojis.findIndex((emoji) => emoji === selectedEmoji) + 1;
  return (
    <>
      {/* <div style={{ width: "100%" }}>
        <GlossySticker>
          <div style={{ fontSize: 72 }}>💩 ✂️ 🧵 🙏 🧸 😈 🤡 🫦 🦷 🧠 🏓 </div>
        </GlossySticker>
      </div> */}
      <VStack gap={16} pt={80} pb={88}>
        <HStack gap={16} style={{ position: "relative" }}>
          <Sticker type="holographic-outline" outline={6} shadow>
            <div
              style={{
                fontSize: 60,
                fontWeight: "bold",
                transform: "rotate(-10deg)",
              }}
            >
              CSS!
            </div>
          </Sticker>

          <Sticker
            type="comic"
            outline={6}
            shadow
            style={{ position: "absolute", left: 130, top: 30 }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: "bold",
                fontFamily: "arial",
                background: "linear-gradient(45deg, blue, red, yellow)",
                // @ts-expect-error
                "-webkit-background-clip": "text",
                backgroundClip: "text",
                color: "transparent",
                transform: "rotate(3deg)",
              }}
            >
              stickers
            </div>
          </Sticker>
          <PuffySticker
            shadow
            style={{ position: "absolute", left: 130, top: 80 }}
          >
            <div
              style={{
                fontSize: 90,
                fontWeight: "bold",
                fontFamily: "arial",
                background:
                  "linear-gradient(45deg, red, cyan, yellow, pink, blue, red)",
                // @ts-expect-error
                "-webkit-background-clip": "text",
                backgroundClip: "text",
                color: "transparent",
                transform: "rotate(-23deg)",
              }}
            >
              ℳ
            </div>
          </PuffySticker>
          <PuffySticker
            shadow
            style={{ position: "absolute", left: 190, top: -90 }}
          >
            <div
              style={{
                fontSize: 92,
                transform: "rotate(13deg)",
              }}
            >
              🔥
            </div>
          </PuffySticker>
          <PuffySticker
            shadow
            style={{ position: "absolute", left: 50, top: 70 }}
          >
            <div
              style={{
                fontSize: 62,
                transform: "rotate(-13deg)",
              }}
            >
              🛼
            </div>
          </PuffySticker>
          <Sticker
            type="comic"
            outline={2}
            shadow
            style={{ position: "absolute", left: 240, top: 75 }}
          >
            <div
              style={{
                fontSize: 70,
                transform: "rotate(27deg)",
              }}
            >
              🤯
            </div>
          </Sticker>
        </HStack>
      </VStack>
      <Frame
        style={{
          display: "block",
          marginTop: 32,
          marginBottom: 32,
          marginLeft: -16,
          marginRight: -16,
          padding: 4,
        }}
      >
        <Frame style={{ width: "100%", padding: 4 }} variant="field">
          <Ruler
            style={{
              alignSelf: "flex-start",
              marginLeft: -2,
              marginRight: -2,
              marginTop: -2,
            }}
          />
          <Workspace>
            <VStack justifyContent="center" alignItems="center" p={60} gap={16}>
              <HStack gap={32}>
                <Sticker
                  type="outlined"
                  outline={4}
                  shadow
                  seed={selectedEmojiIndex}
                >
                  <div style={{ fontSize: 72 }}>{selectedEmoji}</div>
                </Sticker>
                <Sticker
                  type="comic"
                  outline={1}
                  shadow
                  seed={selectedEmojiIndex}
                >
                  <div style={{ fontSize: 72 }}>{selectedEmoji}</div>
                </Sticker>
                <PuffySticker>
                  <div style={{ fontSize: 72 }}>{selectedEmoji}</div>
                </PuffySticker>
              </HStack>
              <HStack gap={32}>
                <Sticker
                  type="holographic-outline"
                  outline={4}
                  shadow
                  seed={selectedEmojiIndex}
                >
                  <div style={{ fontSize: 72 }}>{selectedEmoji}</div>
                </Sticker>

                <Sticker
                  type="holographic"
                  // TODO: support for outline
                  outline={2}
                  seed={selectedEmojiIndex}
                >
                  <div style={{ fontSize: 72 }}>{selectedEmoji}</div>
                </Sticker>
                <Sticker
                  type="holographic-monochrome"
                  outline={6}
                  shadow
                  seed={selectedEmojiIndex}
                >
                  <div style={{ fontSize: 72 }}>{selectedEmoji}</div>
                </Sticker>
              </HStack>
            </VStack>
          </Workspace>
        </Frame>
        <VStack pt={4}>
          <HorizontalSelector
            onValueChange={(value) => setSelectedEmoji(value)}
            selectedItem={selectedEmoji}
            items={emojis}
          />
          <HStack justifyContent="space-between" p={8}>
            <p>{emojis.length} emoji stickers</p>
            <p>Sticker #{selectedEmojiIndex} selected</p>
          </HStack>
        </VStack>
      </Frame>
    </>
  );
};

export default Demo;
