import React from "react";
// import { Button, Frame, Window, WindowContent, WindowHeader } from "react95";
import { Frame } from "react95";
import windowsWallpaper from "../public/windows-wallpaper.png";

import styled, { ThemeProvider } from "styled-components";
// import { HStack, VStack } from "./UI/Stack";
// import ReactDOM from "react-dom";
// import pamelaAnderson from "react95/dist/themes/pamelaAnderson";

{
  /* When an element is blurred with **filter: blur()**, the element looks washed out because
its pixels become more transparent the farther they are from the center of the element.

While sometimes this might be the effect you're looking for, there are cases
where you'd want to keep clearly defined edges of the blurred element.

One of the hacky solutions involved scaling up the element, blurring it
and then clipping out the feathered parts. This however has a big
downside - you're making parts of that element invisible.

I've spent too many hours on that problem but I am proud to say I've
finally found a solution that works on every browser. Not only that,
I've also found a way to animate the blur too! */
}

const BlurImage = styled.div`
  .solid-blur-backdrop-filter {
    position: relative;
    display: inline-block;
    border-radius: 32px;
    overflow: hidden;
    /* 
    This is really important!
    Without this line there's an empty space below the <img /> 
    that makes the backdrop extend beyond the image.
    */
    line-height: 0;
    border: 2px solid red;
  }
  .solid-blur-backdrop-filter::after {
    @property --blur {
      syntax: "<length>";
      inherits: false;
      initial-value: 50px;
    }
    --blur: 50px;
    content: "";
    position: absolute;
    inset: 0;
    display: block;
    -webkit-backdrop-filter: blur(var(--blur));
    backdrop-filter: blur(var(--blur));

    transition: 0.6s --blur ease-in-out;
    @supports (-moz-appearance: none) {
      transition: 0.6s backdrop-filter ease-in-out;
    }
  }

  .solid-blur-backdrop-filter:hover::after {
    --blur: 0px;
  }

  .solid-blur-backdrop-filter img {
    position: relative;
    display: inline-block;
    width: 200px;
    height: 400px;
    object-fit: cover;
  }
`;

const BlurImage2 = styled.div`
  .solid-blur-svg-filter {
    position: relative;
    display: inline-block;
    border-radius: 32px;
    overflow: hidden;
    /* 
    This is really important!
    Without this line there's an empty space below the <img /> 
    that makes the backdrop extend beyond the image.
    */
    line-height: 0;
  }

  .solid-blur-svg-filter img {
    position: relative;
    display: inline-block;
    width: 200px;
    height: 400px;
    object-fit: cover;
  }

  @supports (-moz-appearance: none) {
    .inner {
      filter: url(#solidify);
    }
    .solid-blur-svg-filter img {
      /*   filter: url(#expand) blur(var(--blur)); */
      /*   filter: url(#blur); */
      filter: blur(50px);
      transition: 0.3s filter ease-in-out;
    }
    .solid-blur-svg-filter:hover img {
      filter: blur(0px);
    }
  }

  @supports not (-moz-appearance: none) {
    @property --svg-blur {
      syntax: "<length>";
      inherits: false;
      initial-value: 50px;
    }
    .solid-blur-svg-filter img {
      // Bigger blur values break on mobile iOS (weird bright result)
      --svg-blur: 45px;
      filter: blur(var(--svg-blur)) url(#solidify);
      transition: 0.3s --svg-blur ease-in-out;
    }
    .solid-blur-svg-filter:hover img {
      --svg-blur: 0px;
    }
  }
`;

const BlurOverlay = styled.div`
  .blur-overlay {
    --end-blur: 20px;
    --duration: 0.3s;
    --easing: ease-in-out;
    position: fixed;
    inset: 0;
  }
  @supports (-moz-appearance: none) {
    .blur-overlay {
      transition: var(--duration) backdrop-filter var(--easing);
    }
    .blur-overlay[data-state="open"] {
      backdrop-filter: blur(var(--end-blur));
    }
    .blur-overlay[data-state="closed"] {
      backdrop-filter: blur(0px);
    }
  }

  @property --overlay-blur {
    syntax: "<length>";
    inherits: false;
    initial-value: 0px;
  }
  @supports not (-moz-appearance: none) {
    .blur-overlay {
      transition: var(--duration) --overlay-blur var(--easing);
      -webkit-backdrop-filter: blur(var(--overlay-blur));
      backdrop-filter: blur(var(--overlay-blur));
    }
    .blur-overlay[data-state="open"] {
      --overlay-blur: var(--end-blur);
    }
    .blur-overlay[data-state="closed"] {
      --overlay-blur: 0px;
    }
  }

  .blur-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 2px;
  }
`;

const DesktopScreen = styled(Frame)`
  background: url(${windowsWallpaper.src});
  background-size: cover;
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const BackdropBlurOverlayDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <DesktopScreen variant="field">
      {mounted && (
        <BlurOverlay
          onMouseOver={() => setIsOpen(true)}
          onMouseOut={() => setIsOpen(false)}
        >
          <div
            className="blur-overlay"
            data-state={isOpen ? "open" : "closed"}
          />
        </BlurOverlay>
      )}
    </DesktopScreen>
    // <HStack justifyContent="center">
    //   <ThemeProvider theme={pamelaAnderson}>
    //     <Button variant="raised" size="lg" onClick={() => setIsOpen(!isOpen)}>
    //       Open modal
    //     </Button>
    //   </ThemeProvider>
    //   {mounted &&
    //     ReactDOM.createPortal(
    //       <BlurOverlay onClick={() => setIsOpen(false)}>
    //         <div
    //           className="blur-overlay"
    //           data-state={isOpen ? "open" : "closed"}
    //         >
    //           {isOpen && (
    //             <div>
    //               <Window style={{ minWidth: 260 }}>
    //                 <WindowHeader>Awesome</WindowHeader>
    //                 <WindowContent>
    //                   <VStack gap={24}>
    //                     <p>Do you really want to close this pretty overlay?</p>

    //                     <HStack justifyContent="flex-end">
    //                       <Button onClick={() => setIsOpen(false)}>
    //                         Close
    //                       </Button>
    //                     </HStack>
    //                   </VStack>
    //                 </WindowContent>
    //               </Window>
    //             </div>
    //           )}
    //         </div>
    //       </BlurOverlay>,
    //       document.getElementById("portal-root")!
    //     )}
    // </HStack>
  );
};
// const BlurImageDemo = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   return (
//     <div>
//       <BlurOverlay isOpen={isOpen} />
//       <Button onClick={() => setIsOpen(!isOpen)}>Toggle</Button>
//       <BlurImage>
//         <div className="solid-blur-backdrop-filter">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src="https://images.complex.com/complex/image/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_face,q_auto,w_1280/bebllwzjpsujz9ffwp6s.png"
//             alt=""
//           />
//         </div>
//       </BlurImage>
//       <svg>
//         <filter id="solidify" colorInterpolationFilters="sRGB">
//           <feComponentTransfer>
//             <feFuncA type="discrete" tableValues="1" />
//           </feComponentTransfer>
//           {/* <feColorMatrix
//             in="SourceGraphic"
//             type="matrix"
//             values="1 0 0 0 0
//               0 1 0 0 0
//               0 0 1 0 0
//               0 0 0 100 0"
//           ></feColorMatrix> */}
//         </filter>
//       </svg>
//       <BlurImage2>
//         <div className="solid-blur-svg-filter">
//           <div className="inner">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src="https://images.complex.com/complex/image/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_face,q_auto,w_1280/bebllwzjpsujz9ffwp6s.png"
//               alt=""
//             />
//           </div>
//         </div>
//       </BlurImage2>
//     </div>
//   );
// };

const SolidBlurDemo = {
  BackdropBlurOverlayDemo,
};

export default SolidBlurDemo;
