type Props = {
  width?: number;
  height?: number;
  circle?: boolean;
  fullWidth?: boolean;
};
export const Skeleton: React.FC<Props> = ({ width = 100, height = 100, circle = false, fullWidth = false }) => {
  return (
    <div
      style={{
        width: fullWidth ? '100%' : width,
        height,
        borderRadius: circle ? '50%' : 0,
        backgroundColor: '#f0f0f0',
      }}
    />
  );
};
