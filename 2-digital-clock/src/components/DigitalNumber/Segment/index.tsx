export type SegmentStatus = 'on' | 'off';

interface SegmentProps {
  status?: SegmentStatus;
  align?: 'vertical' | 'horizontal';
  className?: string;
}

const colorStyle = {
  on: 'bg-on',
  off: 'bg-off',
};

const alignStyle = {
  vertical: 'w-14 h-3',
  horizontal: 'w-3 h-14',
};

const Segment = ({
  status = 'on',
  align = 'vertical',
  className = '',
}: SegmentProps) => {
  return (
    <div
      className={`${alignStyle[align]} ${colorStyle[status]} ${className} rounded`}
    />
  );
};

export default Segment;
