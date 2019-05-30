// Gets the image from the json_metadata if they are defined, if not it crawls
// the body for an image, if none is found it returns a placeholder
import { imageRegex } from './regex';

const bs58 = require('bs58');

export const getImageList = body => {
  const bodytext = body.replace(
    /(https:\/\/steemitimages\.com\/1000x0\/)/g,
    '',
  );
  const image = bodytext.match(imageRegex);
  return image;
};

export const imageProxy = (imgUrl, width, height, mode, format) => {
  if (imgUrl === '') {
    return undefined;
  }
  // Base58 encode image url
  // https://github.com/steemit/imagehoster
  const bytes = Buffer.from(imgUrl);
  const address = bs58.encode(bytes);
  // Use webp as format for best compression if supported
  // Get the cropped steemitimages URL for an image
  return `https://steemitimages.com/p/${address}/?format=${format || 'match'}${
    width ? `&width=${width}` : ''
  }${height ? `&height=${height}` : ''}${mode ? `&mode=${mode}` : ''}`;
};
