import { fileTypeFromBuffer } from 'file-type';

const SUPPORTED_MIME_TYPE_LIST = ['image/bmp', 'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/jxl'];

export async function isSupportedImage(image: File): Promise<boolean> {
  const arrayBuffer = await image.arrayBuffer();
  const fileType = await fileTypeFromBuffer(arrayBuffer);

  if (SUPPORTED_MIME_TYPE_LIST.includes(fileType?.mime ?? '')) {
    return true;
  }

  return false;
}
