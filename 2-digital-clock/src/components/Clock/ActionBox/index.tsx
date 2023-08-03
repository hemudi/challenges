import {
  ClockMode,
  HOUR_FORMAT_12,
  HOUR_FORMAT_24,
  HourFormat,
  MODE_CLOCK,
  MODE_TIMER,
  STATUS_RESET,
  STATUS_START,
  STATUS_STOP,
  TimerStatus,
} from '../../../constants/clock';
import Button from '../../Button';

interface ActionBoxProps {
  mode: ClockMode;
  handleHourFormat: (hourFormat: HourFormat) => void;
  handleStatus: (status: TimerStatus) => void;
}

type ButtonAction = HourFormat | TimerStatus;

interface ActionButtons {
  [MODE_CLOCK]: HourFormat[];
  [MODE_TIMER]: TimerStatus[];
}

const actionButtons: ActionButtons = {
  [MODE_CLOCK]: [HOUR_FORMAT_12, HOUR_FORMAT_24],
  [MODE_TIMER]: [STATUS_START, STATUS_STOP, STATUS_RESET],
};

const ActionBox = ({
  mode,
  handleHourFormat,
  handleStatus,
}: ActionBoxProps) => {
  const handleClick = (action: ButtonAction) => {
    if (mode === MODE_CLOCK) handleHourFormat(action as HourFormat);
    else handleStatus(action as TimerStatus);
  };
  return (
    <div className="flex w-fit gap-2 rounded text-xl">
      {actionButtons?.[mode].map((action) => (
        <Button key={action} onClick={() => handleClick(action)}>
          {action}
        </Button>
      ))}
    </div>
  );
};

export default ActionBox;
