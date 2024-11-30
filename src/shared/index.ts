export function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

const ColorStart = 0x000000;
const ColorEnd = 0xffffff;

export function randomColorValue() {
  return Math.floor(Math.random() * (ColorEnd - ColorStart + 1)) + ColorStart;
}

export function hexValueToColorString(value: number) {
  return value.toString(16).padStart(6, "0");
}

export function randomColor() {
  return hexValueToColorString(randomColorValue());
}

export function getImageDimensions(
  url: string
): Promise<{ width: number; height: number }> {
  const image = new Image();
  image.src = url;

  return new Promise((resolve) => {
    image.onload = () => {
      resolve({
        width: image.width,
        height: image.height,
      });
    };
  });
}
