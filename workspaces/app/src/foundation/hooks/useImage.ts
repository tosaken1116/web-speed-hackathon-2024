import { getImageUrl } from '../../lib/image/getImageUrl';

export const useImage = ({ height, imageId, width }: { height: number; imageId: string; width: number }) => {
  return getImageUrl({
    format: 'jpg',
    height: height,
    imageId,
    width: width,
  });
};
