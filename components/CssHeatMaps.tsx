import styled from "styled-components";
import { createNoise2D } from "simplex-noise";

export function createPerlinMatrix(
  width: number,
  height: number,
  scale: number = 1,
  seed: number
): number[][] {
  const noise = createNoise2D(() => seed);
  const matrix: number[][] = [];

  for (let y = 0; y < height; y++) {
    matrix[y] = [];
    for (let x = 0; x < width; x++) {
      matrix[y][x] = noise(x / scale, y / scale);
    }
  }

  return matrix;
}

const Grid = styled.div<{ x: number; y: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(p) => p.x}, 1fr);
  grid-template-rows: repeat(${(p) => p.y}, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  position: relative;
  isolation: isolate;

  div {
    aspect-ratio: 1;
    position: relative;
  }
  div:hover::before {
    content: attr(data-intensity);
    position: absolute;
    bottom: 100%;
    pointer-events: none;
    font-size: 14px;
    padding: 4px 8px;
    max-width: 40px;
    border: 2px solid ${(p) => p.theme.borderDarkest};
    background: ${(p) => p.theme.tooltip};
    color: ${(p) => p.theme.materialText};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 1;
  }
  div:hover {
    outline: 2px solid ${(p) => p.theme.borderDarkest};
    outline-offset: -2px;
  }
  .rainbow {
    --hue: calc((1 - var(--intensity)) * 240);
    background: hsl(var(--hue), 100%, 50%);
  }
  .green {
    --r: 3;
    --g: 72;
    --b: 29;

    background: rgb(
      calc(255 - ((255 - var(--r)) * var(--intensity))),
      calc(255 - ((255 - var(--g)) * var(--intensity))),
      calc(255 - ((255 - var(--b)) * var(--intensity)))
    );
  }

  .blue-to-red {
    --r-1: 0;
    --g-1: 0;
    --b-1: 255;

    --r-2: 255;
    --g-2: 255;
    --b-2: 0;

    background: rgb(
      calc(var(--r-1) - ((var(--r-1) - var(--r-2)) * var(--intensity))),
      calc(var(--g-1) - ((var(--g-1) - var(--g-2)) * var(--intensity))),
      calc(var(--b-1) - ((var(--b-1) - var(--b-2)) * var(--intensity)))
    );
  }

  .blue-transparent-red {
    --r-1: 0;
    --g-1: 0;
    --b-1: 255;

    --r-2: 255;
    --g-2: 0;
    --b-2: 0;

    /* remaps the "--intensity" value to range from -1 to 1 */

    --alternate: calc((0.5 - var(--intensity)) * 2);

    /* takes an absolute value of "--alternate" this way 
    when "--intensity" is equal 0 or 1 the alpha = 1
    but when its 0.5 (middle value) the alpha = 0 */

    --alpha: max(var(--alternate), -1 * var(--alternate));

    background: rgba(
      calc(var(--r-1) - ((var(--r-1) - var(--r-2)) * var(--intensity))),
      calc(var(--g-1) - ((var(--g-1) - var(--g-2)) * var(--intensity))),
      calc(var(--b-1) - ((var(--b-1) - var(--b-2)) * var(--intensity))),
      var(--alpha)
    );
  }

  .blue-transparent-red-eased {
    --r-1: 0;
    --g-1: 0;
    --b-1: 255;

    --r-2: 255;
    --g-2: 0;
    --b-2: 0;

    /* remaps the "--intensity" value to range from -1 to 1 */

    --alternate: calc((0.5 - var(--intensity)) * 2);

    /* takes an absolute value of "--alternate" this way 
    when "--intensity" is equal 0 or 1 the alpha = 1
    but when its 0.5 (middle value) the alpha = 0 */

    --alpha: max(var(--alternate), -1 * var(--alternate));

    /* Apply cubic easing to the alpha channel */

    --alpha-ease-cubic: calc(var(--alpha) * var(--alpha) * var(--alpha));

    background: rgba(
      calc(var(--r-1) - ((var(--r-1) - var(--r-2)) * var(--intensity))),
      calc(var(--g-1) - ((var(--g-1) - var(--g-2)) * var(--intensity))),
      calc(var(--b-1) - ((var(--b-1) - var(--b-2)) * var(--intensity))),
      var(--alpha-ease-cubic)
    );
  }

  .multi-color {
    --number-of-colors: 5;
    background: linear-gradient(
      to right,
      #ca0020 0%,
      #ca0020 20%,
      #f4a582 20%,
      #f4a582 40%,
      #f7f7f7 40%,
      #f7f7f7 60%,
      #92c5de 60%,
      #92c5de 80%,
      #0571b0 80%,
      #0571b0 100%
    );
    --total-width: calc(var(--number-of-colors) * 100%);
    background-size: var(--total-width) 100%;
    --move: calc(100% * var(--intensity));
    background-position-x: var(--move);
  }
`;

const SimpleDemo = ({
  variant,
}: {
  variant:
    | "rainbow"
    | "green"
    | "blue-to-red"
    | "blue-transparent-red"
    | "blue-transparent-red-eased"
    | "multi-color";
}) => {
  const x = 40;
  const y = 20;
  const grid = createPerlinMatrix(x, y, 25, 0.3)
    .flatMap((a) => a)
    .map((value) => Number(((value + 1) / 2).toFixed(2)));

  const swagGrid = grid.map((value) => {
    const steps = 5;
    const stepLength = 1 / (steps - 1);
    const offset = Math.round(value / stepLength) * stepLength;
    return offset;
  });
  return (
    <>
      <Grid x={x} y={y}>
        {(variant === "multi-color" ? swagGrid : grid).map(
          (dataPoint, index) => (
            <div
              key={index}
              className={variant}
              style={{
                // @ts-expect-error
                "--intensity": dataPoint,
              }}
              data-intensity={dataPoint}
            />
          )
        )}
      </Grid>
    </>
  );
};

const CssHeatMaps = {
  SimpleDemo,
};

export default CssHeatMaps;
