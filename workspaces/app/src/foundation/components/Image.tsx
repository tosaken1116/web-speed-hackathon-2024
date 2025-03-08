import type * as CSS from 'csstype';

type Props = {
  height: number | string;
  objectFit: CSS.Property.ObjectFit;
  width: number | string;
} & JSX.IntrinsicElements['img'];

export const Image: React.FC<Props> = ({ height, loading = 'lazy', objectFit, width, ...rest }) => {
  return (
    <img
      {...rest}
      height={height}
      width={width}
      loading={loading}
      style={{
        objectFit,
        display: 'block',
      }}
    />
  );
};
