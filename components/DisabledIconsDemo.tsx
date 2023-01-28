import React from "react";
import styled, { ThemeProvider, useTheme } from "styled-components";
import { HStack, VStack } from "./UI/Stack";
import original from "react95/dist/themes/original";
import fxDev from "react95/dist/themes/fxDev";
import vaporTeal from "react95/dist/themes/vaporTeal";
import rose from "react95/dist/themes/rose";
import rainyDay from "react95/dist/themes/rainyDay";
import olive from "react95/dist/themes/olive";
import theSixtiesUSA from "react95/dist/themes/theSixtiesUSA";
import { url } from "inspector";
import {
  Button,
  Checkbox,
  ColorInput,
  Frame,
  NumberInput,
  ScrollView,
  Separator,
  Slider,
} from "react95";
import { Theme } from "react95/dist/types";
import Code from "./UI/Code";
import { createBorderStyles, createBoxStyles } from "react95/dist/common";
import Image from "next/image";

type FilterType = "original" | "modern";
const Wrapper = styled.div``;

const IconButton = styled(Button)`
  width: 72px;
  height: 72px;

  img {
    display: block;
    width: 32px;
    height: 32px;
  }
`;

const iconsMap: { src: string; theme: Theme }[] = [
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABK0lEQVR4AcXBi23jUAxFwUNCfV12Jrqzx8oYI8gGWtvyR5biGWMhM5sdZabxwMSFeZ7Zw+l04qwB4w7nQJnJWXOHc6CIIDM5a1Y4B5JERJCZnDU3OAeTRESQmZw1FyYOZGbc0IDxY+Ig8zwzzzNLVUVEsOR8mPMOM97lvMuMqmIrZysz9uDsQBFUFVs4W5hRY7AHZyeKoKp4lfMqM2oMJEE373J2pAiqilc4rzCjxkASv7p5h7MzRVBVPMt5lhk1BpK40s1WEy9QBM9QBDUGknhk4hlm1BhIYpUZWzh76WZJEVQVjziPmFFjIIkjTKwx4x9F8KubK2bcogi+dbNmYk03VcWVKiTxn26qilVVSOKWiTsk8SxJbOF8mPNhzodNXKgq/tLEQmby174AAGVj0Xjq+u0AAAAASUVORK5CYII=",
    theme: original,
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEyUlEQVR4Ac3Bi2EbNxBF0QuahaCTGVey7gRvOgkryaATdoIsFK4t0fxJYuScU/ggSYOVpMIFkgZ3SCp8UuEdJA1Wkoqk4e5kJpOkwkrSYOXubDyTdMczSXc8k0n8IqnwAd+4Q9Jwd2VmuLvcnVqrWC3LQimFWiu1Vrm73J1aK57Jj1oxM76XgqeTLsyM76Xwo1Zqrfw4/iBJ5JK7KzODdyjcIWm4O5nJ1Fqj986UmUytNXrvTJnJ5O54OumJmdF7xzMBcYsQk6TCA/Y8wMzYRARTa41NRDC11thkJkKYGSUKvwjUeKHCOSEmSUNS4Y5v3OHucndqrdRaKaVQa+VwOHA8HlmWhVIKtVYOhwPH45FlWSilUGvlcDjgOEnyQn/zQoVbkkQuZWZwwzfucHe5O1EK5ft3zIxaK6UUaq0cDgeOxyPLslBKodbK4XDgeDyyLAulFGqt1GPFcdK/gwdogAe3JAmJgOCKPQ9qQLhjQM/EzHgtIphaa2wigqm1xkYpJqnwEAFiAIULvnGHu8vdiQgaEMDy119EBC5Ra6XWSimFWiuHw4Hj8ciyLJRSqLVyOBw4Ho8sy0IphVor9VhxnCS5SQIlJAKCM3se1IAAGhBA4y0z47WIYGqtsYkIptYaG6WQBOIyCST+pQEUXtnzoAAaEEADAmj8zsx4LSKYWmtsIgJJZCYPkUDikh03SBqcNCCABgTQuM3MMDPcHXcnInB3rhNXSSABYjV4ZcejxsAzCaABwWPMDDPD3blJjaskkEDi3I4rJI3WGq+ZGW0MeiaNLySBBBKIaXCy44beO5eYGYzBU6lwlQQSSCDx2o4nKIXP0wAECDR4QwIJJJAAsdlxg5nx5dR4ocFPEkgggQQSq8FqxwWShrvTe+frBKjxhgY/SSCBBBKbHTd4Ju9RCh8nAcG/gp80QAM0QAIJJDY7rvBM0p2PKIWPkYDgKgkkkNjsuCLd8Uz+jMZbwU8SSGx2/N9I/K4BwU8Smx1XZCbiD5D4XQCNS/ackTRYtdaYIoIvo8HvAmhAcMmeE0mDVWuNKSL4SkKISxoQQAOCc3tJg1VrjSki+BMkIfFCavwSQAOCS/asWmv03vnTJDFJvJA4Cd4Sq8Jqx4mZYWa4O+7OuVL4Mq01WmuAuGfPSe+dyczYZCbnSoExeIrM5LUxBlNE8Kg9Z3rvmBlfQRLTGIMpIrhPrAone55gDB6WmUhiGmMwRQQfteeJxuAuSYwxmCKC9xGrwit7Lui9Y2ZMmcktvXcmM2MzBm/03pnGGEwRwbPs+YTeO2bG1HtnMjM2vXcmM2OKCD5OrApn9jxB7x0zY+q9szEzpojgc8SqcMGeK3rvmBmbMXij946Z0Xtn6r0zmRmbiODzxKpwxZ47zIzeO5OZMQY39d7JTJ6ocMNeEpLITM713pnMjKn3zsbM6L3zp+2BwsrdB6vM5FzvncnMmHrv/F8UfjdYZSbXmBm9d67JTD5DEieFOwrXDVaZyXtlJh8hiZPCgwr3DVaZyaMyk/eQxEnhnQqPG6wyk3syk0dI4qTwQYX3G6wyk2syk1skcVL4pMLHDVaZybnM5BJJnBSepPB5g1VmsslMXpPESeHJCs8zWGUmmckkiZPCf6TwfINfCv+xfwBkA0TLpEkjawAAAABJRU5ErkJggg==",
    theme: fxDev,
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFX0lEQVR4AdXBjXUaYbJF0XORAulM+iMSK5O+lYkzUVUmQyQ13cjIIAP6sd96mr3FP2C7+SLb4i88cltznThju8cYfEVmsmpAfJG4rm1zjW1WYmW7xxjM88xXVBWZiW1W4gvEn9o2tsUVtts2thljMM8zHxUR2GbT3WyqiszENivxSQ9catvYFjdkZgAeY/Djxw8+IiLY7/dkJicRgW2maUIS0zSRmQaCT3jkBpvmDtuAWZbmHkncIonuZp5nNrax3YD4IHGpbQNmWZp7JGGDDd3NNZK4YGABAjCvuptNVZGZ2GYlPuCBSx4jWZYGBAQQQAABBBBAEAHPzyDBfh/Y5lxEkJm8MrDwYgAGgqOIwDbTNCGJaZrITAPBOx44Y+NlaUCckyACIiACIjiyYQyQYL8PbHOy3++5kIC5JCA5ighsM00Tkpimicw0ENzxwC82vSwNiHMS2GaMwRiDMQaZycbmaAyQYL8PbBMRZCYbAwNIVgGYFwGYCxGBbaZpQhLTNJGZBoIbHljZ9LI0IN6KgDEGy7IwxmC/32ObzMTm1RggwX4fZCYbAwswgOCXAASYqyIC20zThCSmaSIzDQRXPLAaA49hIHgrAjKTiCAisM2yLEQENhfGAMlkJpsBDF4YCH5JXtnw/Aw2RHAUEdhmmiYkMU0TmWkgeGPHDVVJVbKxTXfT3SzLwklVUpVcMhsDC5fMJRuWhVfdvJLEZp5nxhjYZtW8seOGeR7M8+CaiGAzz4N5HlxjLgVgLtn8oZtXktjM88wYA9usmjNiZdPL0oA4qUpOxhi8lZmczPPgJAJsXjUvxDkD5qSbVxJ/6G42VUVmYpuVWD1ywzwPTrq5YvARAsw5AwuwAGIjgQ02f+hu7nnkhqrko+Z58FZ3I4mNuaUBsbG50N18xCM3zPPgb3U3kri0cMmAOelurqkqMhPbrMQvD6wyCSk8RgPBuarkcHjicHjicHjicHjicHjicHhimn5yLgJs6G6QCInn52cigt/MpT0n3c01VUVmYpuVOCPO2PSyNCA+KwJs6G6OJI662Ujit+aFOOlurqkqMhPbrMQbO87YKEJA8xkRYEN3g0RVcdTNSXfzm/iIqiIzsc1KXPHAG5mEFB6jgeA9EWBDd3MUwfTzJ3RzIoEUPD8/ExG8CE66m7eqiszENitxw44rbBQhoLklAiJgMXQ3SCBBN9fYC5vu5j1VRWZim5W4Y8cNNooQ0JyrSiI4soFukKCbV91sJKgqNt286m5OuptzVUVmYpuVeMeOO2wUIaDZVCWZAzDLwm/dHHXz1hgz3bySRETQ3bxVVWQmtlmJD9jxl6qKE4kjCSTo5irbbLqbk6oiM7HNSnzQjjtselkaELdkJlXFphsk6OZVN0eSqCo23c25qiIzsc1KfMKOG2x6WRoQ99hWZlJVbLo56uYPYwy6m3NVRWZim5X4pB3/gG1lJlXFiSQ2kpBEd/NWVZGZ2GYlvmDHDTaKEBF8iG1lJlXFpruRRHdz0t2cVBWZiW1W4oseuCOTyMQSjAGHwxP/+c9PYDBGEsEm+CUzY5omS2KaJmyzsc25qiIzsc1K/IUd75PNh9lWZlJVXFNVZCa2WYm/tOMdNs0n2VZmUlWcqyoyE9usxD+w4w6bZtXdfJZtZSZVRVVRVWQmtlmJf+SRG2x6WZoX4itsy3bb5oz4hx55l/gbtsX/oR032ChCQPOd7XhHhIDmu9pxh41YRYjvasc7bGSzar6jHe+waY7Ed/TIHTa9LM2yiO9qx/+4HXfYECG+sx33yYYI/hDBt/DA+yITS/Djx0+qWA3sZCX+n+34GNkQwbcjPqf5TXwD/wX5t+jqwrT3TgAAAABJRU5ErkJggg==",
    theme: vaporTeal,
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACZElEQVR4AcXBgW3rOBRE0TuOC1EqIVUZ51VilUJ2sqnkreTvAIqh5C9sB3uObCcvYFs84MyqtcaeJGzTWmNPErZprbEniUeduYkIjkQERyKCVzixY5sjtjlim2ed2LHNEdscsc2zzqwkcUQSRyTxKmdWmcmeJDaZyZ4kNpnJniQedeYmIjgSERyJCF7hxI5tjthmLyLY2OZZZ3Zsc8Q2m8xkM8ag945tnnVmJYkjkthrrbEppVBKISKwjW1WyR3b4i/OrDKTPUlsMpM9SWwyk01rjY1tMpMxBrVWMpMxBqsExA/eaq2utRIRjDEYY9B7p9ZKrZWIYIzBGIPeO7aZ5xnbbGqtSGKeZy6XC/M88/7+zuVyYZ5nlmUxEHzjxI5tjthmLzORxKfWGraRRCmF3juSKKXQe2eVfOPEjm2O2OaebSTxqbWGbSRRSqH3jiRKKfTeWSUHZDttc882trlnG9t8sk1rjZ+MMai1shJ3zqwykz1JbDKTjSQyk4jANpnJp4jgGWduIoIjEcFmjEFrjY0kbPMKJ3Zs851aK2MMWmvYxja2sc0zzuzY5ohtNrVWeu+01mit8QpnVpI4Iol7tVZ675RSeAXxmOy9U0rhvxhjUGtlJe688ZhYlsXzPDNNE38zTRPzPDMtiyu4Q3DzxuNiWRZHBPM8M00TP/n4+OCfZaEBAQaClXiN5Kb3TimFeyHR+CMAcyXxetl7p5TCp5BofBWAgTdeL5Zl8TzPTNNESDS+CsBcSfwSQ7JqfBWAuRKrE7+o8VUA5krcvPFLOoTAlT8CMFdiR/wyQ7IyV+J/knzjX7iWFfpK7PVmAAAAAElFTkSuQmCC",
    theme: rose,
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACfElEQVR4Ae3B0XFbVwxF0X1s93WhTtTJPajE6oRAZQifJSYUxzJpJzP50Vp8+vTp06f/m8DDOxYPshlu2IjfIPBwxeYu27KZvQcQ1zL5m4244xs3IoIHzN4DCBiu7S2uDGc24gMCD1dmNvd0NxHBzJApwNimqlhr8Q9xyOQHG3HjK4S5Yge/Ionv379jG0lEmL03UvL8/IKURCSZ4umpsIeIJGKQ0hG4iuTNFx4kicPMIInDzGAbENcyzd4bGyQBA4i9h73BZnjzFcJcsYOfsY0kbGMbSdjGNlJyOoEENlQVdtINVSAlEQMIGCISCVeRX7ghiVuSOMwMkriQxGFmkGBvmBlmoLu4lilgAAFDRHE2Aob3BAxvZoaDJGYGSRxmBhASzAwHSdiwN28GEBLYsDdnQ3dTFdgg7pszJHGoKtZagIAhM7HNxcxwyBR7czZIwoa9h+6mKjjYIB4zNkQUay1AZIINM8MhM9nbZIINM5wNICR+mIHuoiqw+eErD7BxRLHWAgQM3eJ0KjKTp6fkdDoBplucTgUMILqLl5cXZobM5Pn5hSqwTVXxjTtsZu/hlcgEW8wMsIFkxmQKG2zOBhDdRVVwsTdEFFXBhbjDZvaG7mKtxSuRCTbMDIfMZG8DA4juoiq4sGEGuouqwOYgcYfNRBRrBd3FWgEMr0Qm2GDD3gOI7qIquGVzS+IOm9kbuou1gu5iraC7WGvxSlx0F1XBr9hcSDxmOKsq1gq6i7WC7mKtAIZDd1MVfMTmQrwRv2c4m4HuYq2gu1gr6C6qgp+xuRA3xJ8ZzqqKtYLuYq0gk3dsLsQHxL8znM1Ad1EVHGwuxB3ivzG8Jx70FzzWb8/V5VanAAAAAElFTkSuQmCC",
    theme: rainyDay,
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB6ElEQVR4AcXBgXGrSBRE0TssgZDJvFCcCU0mDqVfJnYks7DF1Oe7kITkrdI5hRdIavwgqfCCkSdJahHBiQYUnjTyglor/5eRF2UmG9v8xsCbDbzZwJsNvNnAmw282cCbDbzZwBMkNVbLsnBGUuNJhQskNVYRwSYi+Mk2G9t0kgoPFO6Q1FhFBEe2meeZzMQ2krDNT7bpJBVOjJyQ1FhFBL8REXSSGjtJhd0/HEhqEaGIYJomzthmExF8f3/z9fWFbT4/P/n4+OCWaZqYpolpmpimSbYXVgM7SS0iiAhusc08z5yRRETQOQJHcEdjNbKS1CKCq+Z5ppRCJ4kjRxA2NYISgW1uKZLaPM9sMpNHbDPPM5vMZGMbSdhmYxsk/iMREWxs00liVUYOaq10mcmZiGBZFjaS6GzTRQTYdLa5ZWSVmWxqrXS1VrrM5Cgi2NjmHts8MnKQmXS1VrpaK11m8ohtrhq5ITPpaq10tVa6zOTINs8auSAz6WqtdLVWumVZeMXIyjabiOCRzKSrtbJZloWrJLErrEZWkthIoosIHslMbHOFJHaFg8LfGjtJdBHBLba5RxK7wonCbY2dJLqI4Mg2ZySxK9xRuKaxk0QXEdjmSBK7wgWF5zV2kugksSs8ofA7jT8KL/gX3uTg+E/t5QMAAAAASUVORK5CYII=",
    theme: olive,
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnUlEQVR4AcXBC27rSAwAwaaQe3Fupj4a52RcBbABPa3tyHY+VcET1OYBNXhS8AW1uRhjkJncMuekqrhSgxOCO9RmM8YgM3nGnJOq4pMaPBDcoPYYg8zkHXNOqgo1uCM4UHtdV+6ZczJGslc1yUzuiQg2wQ0LO2qv68ojYyRHYySPdDeb5oaFC7XXdeWndDeb5mBho/YYgzOqJkdVkzOqik2z88FFZnJGZtLNQXJGZvJJbTXYLGqPMfgtVYWK2mw+2GQmZ0RwVzenZCZ7C0/ohm6+jdoLf2zhjy38sYXNnJPfMudkb1GjqvgtYwxUrhYu5pz8tDknR8GF2uu68kgEX+rmrohA5UqN4F+94SdEBCp7agT/1xu+U0SgsqcGm+C2rioyk3fMORljoLKnBhfBfc2mqshMnjHnZIzBJ5U9NdgJHlBb5aqqyExumXMyxuBK5UgNDoIvqM2FylVVkZlcRQQq96jBDcFJarOj0t1cRQQqR2rwwAcnqcGF2jygBictvEANIDa8a+E9seEdC++LDa9a+B6h8oqFb6IGL/gPC1nJrKDhY30AAAAASUVORK5CYII=",
    theme: theSixtiesUSA,
  },
];

const FilterButton = ({
  children,
  filterType,
}: {
  children: React.ReactNode;
  filterType: FilterType;
}) => {
  const theme = useTheme();
  const [filterOn, setFilterOn] = React.useState(false);

  const filterId = `${theme.name}-disabled-icon-${filterType}`;

  const svgFilter =
    filterType === "original" ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
        <defs>
          <filter id={filterId}>
            {/* <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -10 -10 -10 15 0"
              result="remove-bright-pixels"
            /> */}
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -21.25 -71.54 -7.21 40 0"
              result="remove-bright-pixels"
            />
            {/* <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -3.3 -5 -1.6 5 0"
              result="remove-bright-pixels"
            /> */}
            <feFlood floodColor={theme.materialTextDisabled} result="color" />
            <feComposite in="color" in2="remove-bright-pixels" operator="in" />
            <feDropShadow
              dx="1"
              dy="1"
              stdDeviation="0"
              floodColor={theme.materialTextDisabledShadow}
            />
          </filter>
        </defs>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
        <defs>
          <filter id={filterId}>
            <feFlood
              result="floodFill"
              flood-color={theme.material}
              flood-opacity="1"
            />
            <feBlend
              in="floodFill"
              in2="SourceGraphic"
              mode="color"
              result="blend"
            />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
            <feDropShadow
              dx="-1"
              dy="-1"
              stdDeviation="0"
              flood-color={theme.borderDark}
            />
            <feDropShadow
              dx="1"
              dy="1"
              stdDeviation="0"
              flood-color={theme.borderLightest}
            />
          </filter>
        </defs>
      </svg>
    );

  return (
    <VStack>
      <IconButton onClick={() => setFilterOn((state) => !state)}>
        {svgFilter}
        <div style={{ filter: filterOn ? `url(#${filterId})` : "none" }}>
          {children}
        </div>
      </IconButton>
    </VStack>
  );
};

const IconsDemo = (props: { filterType: FilterType }) => {
  return (
    <Wrapper>
      <HStack gap={16} fullWidth style={{ flexWrap: "wrap" }}>
        {iconsMap.map((icon) => (
          <ThemeProvider key={icon.theme.name} theme={icon.theme}>
            <FilterButton filterType={props.filterType}>
              <Image src={icon.src} alt="" />
            </FilterButton>
          </ThemeProvider>
        ))}
      </HStack>
    </Wrapper>
  );
};

const Iframe = styled.iframe`
  width: 100%;
`;

const DisabledVideo = () => {
  const theme = useTheme();
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
        <defs>
          <filter id={"video-disabled-filter"}>
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -10 -10 -10 15 0"
              result="remove-bright-pixels"
            />
            <feFlood floodColor={theme.materialTextDisabled} result="color" />
            <feComposite in="color" in2="remove-bright-pixels" operator="in" />
            <feDropShadow
              dx="2"
              dy="2"
              stdDeviation="0"
              floodColor={theme.materialTextDisabledShadow}
            />
          </filter>
        </defs>
      </svg>
      <Iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/OPyWDMmYJhQ"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ filter: "url(#video-disabled-filter)" }}
      ></Iframe>
    </div>
  );
};

const Highlight = styled.span`
  position: absolute;
  inset: -4px;
`;
const HighlightChange = ({
  children,
  ...otherProps
}: React.ComponentProps<typeof Highlight>) => {
  const theme = useTheme();
  const ref = React.useRef<null | HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    ref.current.animate(
      [
        { background: "transparent" },
        { background: theme.focusSecondary },
        { background: "transparent" },
      ],
      {
        duration: 600,
        iterations: 1,
      }
    );
  }, [children, theme]);

  return (
    <span style={{ position: "relative" }}>
      <Highlight ref={ref} {...otherProps} />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </span>
  );
};

const RevealSlider = styled.div`
  height: 28px;
  width: calc(100% + 2px);
  background: ${(p) => p.theme.material};
  border-bottom: 2px solid ${(p) => p.theme.borderDarkest};
  border-right: 2px solid ${(p) => p.theme.borderDarkest};
  box-shadow: inset 2px 2px 0px ${(p) => p.theme.borderLight},
    inset -2px -2px 0px ${(p) => p.theme.borderDark};
`;
const RevealThumb = styled.div`
  position: relative;
  height: calc(100% - 4px);
  width: 12px;
  background: ${(p) => p.theme.material};
  border: 2px solid ${(p) => p.theme.borderDarkest};
  box-shadow: inset 2px 2px 0px ${(p) => p.theme.borderLight};
  top: 2px;
  cursor: grab;
`;
const RevealLine = styled.div`
  position: absolute;

  width: 2px;
  background: white;
  mix-blend-mode: difference;
  left: calc(50% - 2px);
  top: 2px;
  bottom: 28px;
`;
export const InteractiveDemo = () => {
  const theme = useTheme();

  const [enableFeColorMatrix, setEnableFeColorMatrix] = React.useState(true);
  const [threshold, setThreshold] = React.useState(0.4);

  const [enableFeDropShadow, setEnableFeDropShadow] = React.useState(false);
  const [dx, setDx] = React.useState(4);
  const [dy, setDy] = React.useState(4);

  const [enableFeFlood, setEnableFeFlood] = React.useState(false);
  const [iconColor, setIconColor] = React.useState(theme.borderDark);
  const [highlightColor, setHighlightColor] = React.useState(
    theme.borderLightest
  );

  const [enableFeComposite, setEnableFeComposite] = React.useState(false);

  const filterId = "disabled-filter";
  const scrollAreaRef = React.useRef<null | HTMLDivElement>(null);

  const feBlendEnabled =
    enableFeComposite && enableFeColorMatrix && enableFeFlood;

  return (
    <div>
      {/* <div dangerouslySetInnerHTML={{ __html: svgFilter }} /> */}
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
          <defs>
            <filter id={filterId}>
              {enableFeColorMatrix && (
                <>
                  <feColorMatrix
                    type="matrix"
                    values={`1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        -0.2125 -0.7154 -0.0721 ${threshold} 0`}
                    result="transparentize-bright-colors"
                  />
                  <feColorMatrix
                    in="transparentize-bright-colors"
                    type="matrix"
                    values={`1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 10000 0`}
                    result="turn-semi-transparent-pixels-solid"
                  />
                </>
              )}
              {enableFeFlood && (
                <feFlood floodColor={iconColor} result="color" />
              )}
              {enableFeComposite && (
                <feComposite
                  in="color"
                  in2="turn-semi-transparent-pixels-solid"
                  operator="in"
                />
              )}
              {enableFeDropShadow && (
                <feDropShadow
                  dx={dx}
                  dy={dy}
                  floodColor={highlightColor}
                  stdDeviation="0"
                />
              )}
            </filter>
          </defs>
        </svg>
      </div>
      <mark>{threshold}</mark>
      <Code style={{ whiteSpace: "pre" }}>
        {`
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
  <defs>
    <filter id="${filterId}">
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                -0.2125 -0.7154 -0.0721`}
        {` `}
        <HighlightChange key={threshold}>{threshold}</HighlightChange>
        {` 0"
        result="transparentize-bright-colors"
      />
      <feColorMatrix
      in="transparentize-bright-colors"
      type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 10000 0
        "
        result="turn-semi-transparent-pixels-solid"
      />
      <feFlood flood-color="`}
        <HighlightChange>{iconColor}</HighlightChange>
        {`" result="color" />
      <feComposite
        in="color"
        in2="turn-semi-transparent-pixels-solid"
        operator="in"
      />
      <feDropShadow
        dx="`}
        <HighlightChange>{dx}</HighlightChange>
        {`"
        dy="`}
        <HighlightChange>{dy}</HighlightChange>
        {`"
        flood-color="`}
        <HighlightChange>{highlightColor}</HighlightChange>
        {`"
        stdDeviation="0"
      />
    </filter>
  </defs>
</svg>
`}
      </Code>
      <mark>
        {(-0.2125 * 128) / 255 -
          (0.7154 * 128) / 255 -
          (0.0721 * 128) / 255 +
          threshold}
      </mark>
      <br />
      <mark>
        {(-0.2125 * 255) / 255 -
          (0.7154 * 2) / 255 -
          (0.0721 * 0) / 255 +
          threshold}
      </mark>
      <HStack>
        <VStack
          alignItems={"center"}
          justifyContent="center"
          style={{ position: "relative" }}
        >
          <Frame
            style={{
              background: theme.material,
              width: 200,
              height: 228,

              padding: 2,
            }}
            variant="field"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflowX: "scroll",
              }}
              ref={scrollAreaRef}
              onScroll={(e) => {
                if (scrollAreaRef.current) {
                  scrollAreaRef.current.style.setProperty(
                    "--scroll-x",
                    scrollAreaRef.current.scrollLeft + "px"
                  );
                  scrollAreaRef.current.scrollLeft;
                }
              }}
            >
              <HStack
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                {iconsMap.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </HStack>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  pointerEvents: "none",
                  clipPath: "inset(0 50% 0 0)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    paddingBottom: 28,

                    transform: "translateX(calc(-1 * var(--scroll-x)))",
                    willChange: "transform",
                  }}
                >
                  <HStack
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      filter: `url(#${filterId})`,
                    }}
                  >
                    {iconsMap.map((icon, index) => (
                      <Image
                        key={index}
                        src={icon.src}
                        alt=""
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          padding: 32,

                          imageRendering: "pixelated",
                        }}
                      />
                    ))}
                  </HStack>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  pointerEvents: "none",
                  clipPath: "inset(0 0 0 50%)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    paddingBottom: 28,

                    transform: "translateX(calc(-1 * var(--scroll-x)))",
                    willChange: "transform",
                  }}
                >
                  <HStack
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    {iconsMap.map((icon, index) => (
                      <Image
                        key={index}
                        src={icon.src}
                        alt=""
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          padding: 32,
                          imageRendering: "pixelated",
                        }}
                      />
                    ))}
                  </HStack>
                </div>
              </div>
            </div>
            <RevealLine id="reveal" />
          </Frame>
        </VStack>
        <VStack gap={16} style={{ flex: 1 }} p={16}>
          <VStack>
            <HStack gap={4} alignItems="center">
              <Checkbox
                label="feColorMatrix"
                checked={enableFeColorMatrix}
                onChange={() => setEnableFeColorMatrix((state) => !state)}
                style={{ fontWeight: "bold" }}
              />
              <Separator />
            </HStack>
            <VStack p={16} gap={16}>
              <HStack alignItems={"center"} gap={16}>
                <label style={{ width: "50%" }}>Threshold:</label>
                <Slider
                  style={{ width: "50%", marginBottom: 0 }}
                  marks
                  value={threshold}
                  disabled={!enableFeColorMatrix}
                  onChange={setThreshold}
                  min={0}
                  max={1.01}
                  step={0.01}
                />
              </HStack>
            </VStack>
          </VStack>
          <VStack>
            <HStack gap={4} alignItems="center">
              <Checkbox
                label="feFlood"
                checked={enableFeFlood}
                onChange={() => setEnableFeFlood((state) => !state)}
                style={{ fontWeight: "bold" }}
              />
              <Separator />
            </HStack>
            <HStack alignItems={"center"} gap={8} p={16}>
              <label style={{ width: "50%" }}>Fill color:</label>
              <ColorInput
                value={iconColor}
                disabled={!enableFeFlood}
                onChange={(e) => setIconColor(e.target.value)}
              />
            </HStack>
          </VStack>
          <VStack>
            <HStack gap={4} alignItems="center">
              <Checkbox
                label="feBlendMode"
                checked={feBlendEnabled}
                disabled={!(enableFeColorMatrix && enableFeFlood)}
                onChange={() => setEnableFeComposite((state) => !state)}
                style={{ fontWeight: "bold" }}
              />
              <Separator />
            </HStack>
          </VStack>
          <VStack>
            <HStack gap={4} alignItems="center">
              <Checkbox
                label="feDropShadow"
                checked={enableFeDropShadow}
                onChange={() => setEnableFeDropShadow((state) => !state)}
                style={{ fontWeight: "bold" }}
              />
              <Separator />
            </HStack>
            <VStack gap={8} p={16}>
              <HStack gap={4} alignItems="center">
                <label style={{ width: "50%" }}>Shadow color:</label>
                <ColorInput
                  value={highlightColor}
                  disabled={!enableFeDropShadow}
                  onChange={(e) => setHighlightColor(e.target.value)}
                />
              </HStack>
              <HStack gap={4} alignItems="center">
                <label style={{ width: "50%" }}>Dx:</label>
                <NumberInput
                  value={dx}
                  onChange={setDx}
                  disabled={!enableFeDropShadow}
                />
              </HStack>
              <HStack gap={4} alignItems="center">
                <label style={{ width: "50%" }}>Dy:</label>
                <NumberInput
                  value={dy}
                  onChange={setDy}
                  disabled={!enableFeDropShadow}
                />
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </HStack>
    </div>
  );
};
const DisabledIconsDemo = {
  IconsDemo,
  DisabledVideo,
  InteractiveDemo,
};
export default DisabledIconsDemo;

function applySVGFilter(filter: string, element: HTMLElement) {
  // Create a unique id for the filter
  const filterId = `filter-${Math.floor(Math.random() * 1000000)}`;

  // Create the SVG filter element
  const filterSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
      <filter id="${filterId}">
        ${filter}
      </filter>
    </svg>
  `;

  // Encode the SVG filter element as a data URI
  const filterDataUri = encodeURIComponent(filterSVG);
  const filterUrl = `url("data:image/svg+xml;utf8,${filterDataUri}#${filterId}")`;

  // Apply the filter to the element
  element.style.filter = filterUrl;
}
