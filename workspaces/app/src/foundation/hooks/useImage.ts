import { useAsync } from 'react-use';

export const useImage = ({ height, imageId, width }: { height: number; imageId: string; width: number }) => {
  const { value } = useAsync(async () => {
    const dpr = window.devicePixelRatio;

    const img = new Image();
    const href = `${window.location.protocol}//${window.location.host}`;
    const imageUrl = `${href}/assets/images/${imageId}.webp`;
    img.src = imageUrl;

    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d')!;

    // Draw image to canvas as object-fit: cover
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const targetAspect = width / height;

    if (imgAspect > targetAspect) {
      const srcW = img.naturalHeight * targetAspect;
      const srcH = img.naturalHeight;
      const srcX = (img.naturalWidth - srcW) / 2;
      const srcY = 0;
      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, width * dpr, height * dpr);
    } else {
      const srcW = img.naturalWidth;
      const srcH = img.naturalWidth / targetAspect;
      const srcX = 0;
      const srcY = (img.naturalHeight - srcH) / 2;
      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, width * dpr, height * dpr);
    }

    return canvas.toDataURL('image/png');
  }, [height, imageId, width]);

  return value;
};
