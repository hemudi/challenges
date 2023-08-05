import Segment, { SegmentStatus } from './Segment';

interface DigitalNumberProps {
  value: number;
  disabled?: boolean;
}

interface NumberPattern {
  [key: string]: SegmentStatus[];
}

const numberPattern: NumberPattern = {
  0: ['on', 'on', 'on', 'off', 'on', 'on', 'on'],
  1: ['off', 'off', 'on', 'off', 'off', 'on', 'off'],
  2: ['on', 'off', 'on', 'on', 'on', 'off', 'on'],
  3: ['on', 'off', 'on', 'on', 'off', 'on', 'on'],
  4: ['off', 'on', 'on', 'on', 'off', 'on', 'off'],
  5: ['on', 'on', 'off', 'on', 'off', 'on', 'on'],
  6: ['on', 'on', 'off', 'on', 'on', 'on', 'on'],
  7: ['on', 'on', 'on', 'off', 'off', 'on', 'off'],
  8: ['on', 'on', 'on', 'on', 'on', 'on', 'on'],
  9: ['on', 'on', 'on', 'on', 'off', 'on', 'on'],
};

const isVertical = (value: number) => value % 3 === 0;

const DigitalNumber = ({ value, disabled = false }: DigitalNumberProps) => {
  return (
    <div className="flex h-full w-20 flex-wrap justify-between gap-1">
      {numberPattern[value].map((status, index) => (
        <Segment
          key={index}
          className={`${isVertical(index) ? 'ml-3' : ''}`}
          status={disabled ? 'off' : status}
          align={isVertical(index) ? 'vertical' : 'horizontal'}
        />
      ))}
    </div>
  );
};

export default DigitalNumber;
