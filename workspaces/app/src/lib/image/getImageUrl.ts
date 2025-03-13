type Params = {
  format: 'avif' | 'webp' | 'png' | 'jpg' | 'jxl';
  height?: number;
  imageId: string;
  width?: number;
};

export function getImageUrl({ format, height, imageId, width }: Params): string {
  // const url = new URL(`/images/${imageId}`,);

  // url.searchParams.set('format', format);
  // if (width != null) {
  //   url.searchParams.set('width', `${width}`);
  // }
  // if (height != null) {
  //   url.searchParams.set('height', `${height}`);
  // }

  // return url.href;
  return `/images/${imageId}?format=${format}${width != null ? `&width=${width}` : ''}${
    height != null ? `&height=${height}` : ''
  }`;
}
