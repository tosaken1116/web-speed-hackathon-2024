import styled from 'styled-components';
import { Skeleton } from '../../../foundation/components/Skeleton';
import { useCallback, useState } from 'react';

// import { IMAGE_SRC } from './ImageSrc';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  // const [isLoaded, setIsLoaded] = useState(false);
  // const handleLoad = useCallback(() => {
  //   console.log('load!');
  //   setIsLoaded(true);
  // }, []);
  return (
    <_Wrapper>
      {/* {!isLoaded && <Skeleton width={1920} height={1080} />} */}
      <_Image
        src={'/assets/hero-image.webp'}
        alt="Cyber TOON"
        // onLoadedData={handleLoad}
        style={
          {
            // display: isLoaded ? 'inline-block' : 'none',
          }
        }
      />
    </_Wrapper>
  );
};
