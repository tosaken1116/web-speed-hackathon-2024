type Props = {
  width?: number;
  height?: number;
  circle?: boolean;
};
export const Skeleton: React.FC<Props> = ({ width = 100, height = 100, circle = false }) => {
  return <div style={{ width, height, borderRadius: circle ? '50%' : 0, backgroundColor: '#f0f0f0' }} />;
};
