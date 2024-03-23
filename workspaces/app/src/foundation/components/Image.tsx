import type * as CSS from 'csstype';
import styled from 'styled-components';

const _Image = styled.img<{
  $objectFit: string;
}>`
  object-fit: ${({ $objectFit }) => $objectFit};
  display: block;
`;

type Props = {
  height: number | string;
  objectFit?: CSS.Property.ObjectFit;
  width: number | string;
} & JSX.IntrinsicElements['img'];

export const Image: React.FC<Props> = ({ height, loading = 'lazy', objectFit = 'initial', width, ...rest }) => {
  return <_Image {...rest} height={height} $objectFit={objectFit} width={width} loading={loading} />;
};
