import { ReactNode, useEffect } from "react";
import {
  SLIDER_BUTTON_TYPE,
  SliderButtonType,
  SliderStoreState,
  useSliderState,
  useSliderStoreActions,
} from "@store/slider";

interface SliderProps extends Partial<SliderStoreState> {
  children: ReactNode;
}

const Slider = ({ children, ...state }: SliderProps) => {
  const { setSliderState } = useSliderStoreActions();

  useEffect(() => {
    setSliderState(state);
  }, [state, setSliderState]);

  return (
    <div className="flex w-1/3 min-w-fit gap-5 p-5 justify-around items-center border-2 border-purple-400 rounded">
      {children}
    </div>
  );
};

const SliderDisplay = ({ children }: { children: ReactNode }) => {
  const { currentIndex, maxIndex, contentsSize, viewCount, gapSize } = useSliderState();

  return (
    <div
      className={`relative overflow-hidden`}
      style={{
        width: `${contentsSize * viewCount + gapSize * (viewCount - 1)}rem`,
        height: `${contentsSize}rem`,
      }}
    >
      <ul
        className={`flex h-full items-center transition duration-150 ease-in`}
        style={{
          width: `${(maxIndex + 1) * contentsSize + maxIndex * gapSize}rem`,
          gap: `${gapSize}rem`,
          transform: `translateX(${-(currentIndex * (contentsSize + gapSize))}rem)`,
        }}
      >
        {children}
      </ul>
    </div>
  );
};

const SliderButton = ({
  type,
  onClick,
  children,
}: {
  type: SliderButtonType;
  onClick?: () => void;
  children: ReactNode;
}) => {
  const { moveIndex } = useSliderStoreActions();
  const { currentIndex, maxIndex } = useSliderState();

  const isDisabled = () => {
    if (type === SLIDER_BUTTON_TYPE.LEFT) {
      return currentIndex <= 0;
    }
    if (type === SLIDER_BUTTON_TYPE.RIGHT) {
      return currentIndex < 0 || currentIndex >= maxIndex;
    }
  };

  const handleOnClick = () => {
    if (onClick) onClick();
    moveIndex(type);
  };

  return (
    <button
      className="h-fit cursor-pointer items-center justify-center rounded enabled:bg-purple-400 p-3 text-white enabled:hover:bg-purple-600 enabled:active:bg-purple-500 disabled:bg-purple-200"
      onClick={handleOnClick}
      disabled={isDisabled()}
    >
      {children}
    </button>
  );
};

Slider.Display = SliderDisplay;
Slider.Button = SliderButton;

export default Slider;
