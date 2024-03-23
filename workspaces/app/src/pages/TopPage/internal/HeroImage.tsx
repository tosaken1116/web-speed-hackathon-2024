import styled from 'styled-components';

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
  return (
    <_Wrapper>
      <_Image src={'/assets/hero-image.webp'} alt="Cyber TOON" />
    </_Wrapper>
  );
};
