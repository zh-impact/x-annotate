import { expect, describe, it } from 'vitest';

import {
  replaceItemAtIndex,
  randomColorValue,
  hexValueToColorString,
  randomColor,
  getImageDimensions,
} from './index';

describe('replaceItemAtIndex', () => {
  it('replaces an item at a specific index in an array', () => {
    const arr = [1, 2, 3, 4];
    const index = 2;
    const newValue = 5;
    expect(replaceItemAtIndex(arr, index, newValue)).toEqual([1, 2, 5, 4]);
  });

  it.skip('works with negative indices', () => {
    const arr = [1, 2, 3, 4];
    const index = -1;
    const newValue = 5;
    expect(replaceItemAtIndex(arr, index, newValue)).toEqual([1, 2, 3, 4]);
  });

  it.skip('works with out-of-bounds indices', () => {
    const arr = [1, 2, 3, 4];
    const index = 5;
    const newValue = 5;
    expect(replaceItemAtIndex(arr, index, newValue)).toEqual([1, 2, 3, 4]);
  });
});

describe('randomColorValue', () => {
  it('returns a random color value between 0 and 16777215', () => {
    const result = randomColorValue();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(16777215);
  });

  it('returns different values on subsequent calls', () => {
    const firstResult = randomColorValue();
    const secondResult = randomColorValue();
    expect(firstResult).not.toEqual(secondResult);
  });
});

describe('hexValueToColorString', () => {
  it('converts a hex value to a color string', () => {
    const value = 123456;
    const expectedColorString = '01e240';
    expect(hexValueToColorString(value)).toEqual(expectedColorString);
  });

  it('pads the color string with zeros if necessary', () => {
    const value = 1234;
    const expectedColorString = '0004d2';
    expect(hexValueToColorString(value)).toEqual(expectedColorString);
  });
});

describe('randomColor', () => {
  it('returns a random color string', () => {
    const result = randomColor();
    expect(result).match(/^[0-9a-f]{6}$/);
  });

  it('returns different values on subsequent calls', () => {
    const firstResult = randomColor();
    const secondResult = randomColor();
    expect(firstResult).not.toEqual(secondResult);
  });
});

describe.skip('getImageDimensions', () => {
  it('resolves with an object containing the image dimensions', async () => {
    const url = 'https://example.com/image.jpg';
    const result = await getImageDimensions(url);
    expect(result).toHaveProperty('width');
    expect(result).toHaveProperty('height');
  });

  it('rejects if the image fails to load', async () => {
    const url = 'https://example.com/non-existent-image.jpg';
    const error = await getImageDimensions(url).catch((error) => error);
    expect(error).toBeInstanceOf(Error);
  });
});
