import React from "react";
import styled from "styled-components";
import { HStack } from "../../UI/Stack";
import { PuffySticker } from "../Stickers/Stickers";
import Emojis, { emojiBg } from "./Emojis";

type ReactionEl = {
  text?: string;
  emojis?: string[];
  fontSize?: number;
};
function createReactionEl({ text, emojis, fontSize = 16 }: ReactionEl) {
  const flexEl = document.createElement("div");
  flexEl.style.display = "inline-flex";
  flexEl.style.alignItems = "center";
  flexEl.style.gap = `${fontSize / 4}px`;

  flexEl.style.fontSize = `${fontSize}px`;
  if (text) {
    const textEl = document.createElement("span");
    textEl.innerHTML = text;
    flexEl.appendChild(textEl);
  }
  emojis?.forEach((emoji) => {
    const emojiEl = document.createElement("div");
    emojiEl.style.width = `${fontSize}px`;
    emojiEl.style.height = `${fontSize}px`;
    emojiEl.style.display = "inline-block";
    emojiEl.style.backgroundImage = emojiBg[emoji];
    emojiEl.style.backgroundSize = "cover";
    flexEl.appendChild(emojiEl);
  });
  return flexEl;
}
const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  user-select: none;

  position: relative;
  display: inline-flex;
  background: #ccc;
  border-radius: 999px;
  padding: 10px;
  padding-left: 14px;
  & > * {
    user-select: none;
    cursor: default;
  }

  --shadows-small: 0 5px 10px rgba(0, 0, 0, 0.12);
  --shadows-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
  --shadows-large: 0 30px 60px rgba(0, 0, 0, 0.12);
  --edge-grey: gray;
  box-shadow: var(--shadows-small), 0 0 0px 0.5px var(--edge-grey);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(to bottom, white, gray);

    padding: 2px;

    -webkit-mask: linear-gradient(black, black) content-box content-box,
      linear-gradient(black, black);
    mask: linear-gradient(black, black) content-box content-box,
      linear-gradient(black, black);
    -webkit-mask-composite: xor;
    mask-composite: xor;
  }
`;

const Reaction = styled.button`
  all: unset;
  position: relative;
  display: flex;
  & > * {
    transition: transform 0.2s ease-in-out;
    transform-origin: 50% 100%;
  }
  &:hover > *,
  &:focus-visible > * {
    transform: skew(0deg) scaleX(1.3) scaleY(1.3);
    /* transition-delay: 0.5s; */
  }

  &:active > * {
    transition: transform 0.1s;
    transform: skew(1deg) scaleX(1.4) scaleY(1.2);
  }
  padding: 0 6px;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.45));
  transition: filter 0.2s ease-in-out;
  &:hover,
  &:focus-visible {
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25));
  }
  -webkit-tap-highlight-color: transparent;
`;
const Reactions = ({
  onLikeCountChange,
}: {
  onLikeCountChange: (count: number) => void;
}) => {
  const reactionsCount = React.useRef({
    "👍": 0,
    "❤️": 0,
    "😆": 0,
    "😢": 0,
    "😡": 0,
  });
  const reactions = Object.keys(reactionsCount.current);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const reaction = e.currentTarget.dataset.reaction;
    reactionsCount.current[reaction] = reactionsCount.current[reaction] + 1;
    const count = reactionsCount.current[reaction];

    const angryReactions = [
      "mid",
      "dog shit",
      "💩",
      "rly?",
      "boooring",
      "🖕🤓🖕",
      "just why?",
      "RSC suck ass",
      "Tailwind too",
      "You're 🗑️",
      "touch grass",
      "BOOMER",
      "🤬",
      "your mom",
      "clown 🤡",
      "ratioed.",
    ];

    const el = document.createElement("span");
    el.style.position = "absolute";
    el.style.left = `50%`;
    el.style.top = `50%`;
    el.style.transform = `translate(-50%, -50%)`;
    el.style.whiteSpace = `nowrap`;

    if (reaction === "👍") {
      const reactionEl = createReactionEl({
        text: `+${count}`,
        emojis: ["👍"],
      });
      el.appendChild(reactionEl);
    } else if (reaction === "❤️") {
      const heartTypes = ["❤️", "💛", "💚", "🖤", "🧡", "🤎", "💙", "💜"];
      const heartType = heartTypes[count % heartTypes.length];
      const reactionEl = createReactionEl({
        emojis: [heartType],
      });
      el.appendChild(reactionEl);
    } else if (reaction === "😆") {
      const reactionEl = createReactionEl({
        emojis: ["😆"],
        fontSize: 20,
      });
      el.appendChild(reactionEl);
    } else if (reaction === "😢") {
      const reactionEl = createReactionEl({
        emojis: ["💧"],
        fontSize: 20,
      });
      el.appendChild(reactionEl);
    } else {
      const angryReactions: ReactionEl[] = [
        { text: "mid" },
        { text: "dog shit" },
        { emojis: ["💩"], fontSize: 20 },
        { text: "rly?" },
        { text: "boooring" },
        { emojis: ["🖕", "🤓", "🖕"], fontSize: 20 },
        { text: "just why?" },
        { text: "RSC suck ass" },
        { text: "Tailwind too" },
        { text: "You're", emojis: ["🗑️"] },
        { text: "touch grass" },
        { text: "BOOMER" },
        { emojis: ["🤬"], fontSize: 20 },
        { text: "your mom" },
        { text: "clown", emojis: ["🤡"] },
        { text: "ratioed." },
      ];
      const reactionEl = createReactionEl(
        angryReactions[count % angryReactions.length]
      );
      el.appendChild(reactionEl);
    }

    e.currentTarget.prepend(el);
    const offset = 20;
    const x1 = Math.random() * offset - offset / 2;
    const y = -1 * (Math.random() * 40 + 90);
    if (reaction === "😢") {
      el.style.zIndex = "2";
      const x1 = (count % 2 ? offset : -offset) / 2;
      const y = -1 * (Math.random() * 40 + 110);

      el.style.fontSize = "20px";
      const animation = el.animate(
        [
          {
            transform: `translate(-50%, calc(-50% + 10px)) translate(${x1}px, 0px)`,
            opacity: 1,
          },
          {
            transform: `translate(-50%, calc(-50% + 10px)) translate(${x1}px, ${-y}px)`,
            opacity: 0,
          },
        ],
        {
          duration: 500 + Math.random() * 200,
          easing: "ease-in",
          delay: 0,
        }
      );
      animation.onfinish = () => {
        el.remove();
      };
    } else {
      const animation = el.animate(
        [
          {
            transform: `translate(-50%, -50%) translate(0px, 0px) scale(0)`,
            opacity: 0,
            filter: "blur(0px)",
          },
          {
            transform: `translate(-50%, -50%) translate(${x1}px, ${
              (y / 4) * 1
            }px) scale(0.3)`,
            opacity: 1,
            filter: "blur(0px)",
          },
          {
            transform: `translate(-50%, -50%) translate(${0}px, ${
              (y / 4) * 2
            }px) scale(1)`,
            opacity: 1,
            filter: "blur(0px)",
          },
          {
            transform: `translate(-50%, -50%) translate(${
              -x1 * (0.5 + Math.random())
            }px, ${(y / 4) * 3}px) scale(1.2)`,
            opacity: 1,
            filter: "blur(0px)",
          },
          {
            transform: `translate(-50%, -50%) translate(0px, ${y}px) scale(1.4)`,
            opacity: 0,
            filter: "blur(5px)",
          },
        ],
        {
          duration: 500 + Math.random() * 200,
          easing: "ease-out",
          delay: 0,
        }
      );
      animation.onfinish = () => {
        el.remove();
      };
      if (reaction === "👍") {
        onLikeCountChange(count);
      }
    }
  };

  return (
    <Wrapper>
      <HStack>
        {reactions.map((emoji) => {
          const Emoji = Emojis[emoji];
          return (
            <Reaction
              key={emoji}
              onClick={onClick}
              data-reaction={emoji}
              aria-label={emoji}
            >
              <PuffySticker specularConstant={0.3}>
                <Emoji
                  style={{
                    height: 42,
                    width: 42,
                  }}
                />
              </PuffySticker>
            </Reaction>
          );
        })}
      </HStack>
    </Wrapper>
  );
};

export default Reactions;
