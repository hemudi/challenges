import DigitalNumber from '../DigitalNumber';
import Separator from './Separator';

interface TimePanel {
  hours: number;
  minutes: number;
  period: 'AM' | 'PM' | null;
}

const TimePanel = ({ hours, minutes, period }: TimePanel) => {
  return (
    <div className="flex h-full min-h-fit w-full min-w-fit justify-center gap-8 overflow-hidden rounded-xl bg-black p-8">
      <div className="flex items-center justify-center gap-5">
        <DigitalNumber value={Math.floor(hours / 10)} />
        <DigitalNumber value={Math.floor(hours % 10)} />
        <Separator />
        <DigitalNumber value={Math.floor(minutes / 10)} />
        <DigitalNumber value={Math.floor(minutes % 10)} />
      </div>
      {period && (
        <div className="flex flex-col text-right">
          <span className="text-2xl text-cyan-500">{period}</span>
        </div>
      )}
    </div>
  );
};

export default TimePanel;
