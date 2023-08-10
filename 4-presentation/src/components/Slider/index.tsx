import { ReactNode, createContext, useContext } from "react";
import {
  SLIDER_ALIGN,
  SLIDER_BUTTON_TYPE,
  SliderButtonType,
  SliderStoreState,
  createSliderStore,
} from "@store/slider";
import { useStore } from "zustand";

interface SliderProps extends Partial<SliderStoreState> {
  children: ReactNode;
}

const SliderContext = createContext<ReturnType<typeof createSliderStore> | null>(null);

const useSliderStore = () => {
  const store = useContext(SliderContext);
  if (store === null) {
    throw new Error("no provider");
  }
  return useStore(store);
};

const Slider = ({ children, ...state }: SliderProps) => {
  const sliderStore = createSliderStore(state);
  return (
    <SliderContext.Provider value={sliderStore}>
      <div className="flex w-1/3 min-w-fit gap-5 p-5 justify-around items-center border-2 border-purple-500 rounded">
        {children}
      </div>
    </SliderContext.Provider>
  );
};

const SliderDisplay = ({ children }: { children: ReactNode }) => {
  const { currentIndex, maxIndex, contentsSize, viewCount, gapSize, align } = useSliderStore();

  const getTranslateX = () => {
    const fullWidth = contentsSize * viewCount + gapSize * (viewCount - 1);
    if (align === SLIDER_ALIGN.FIRST) return -(currentIndex * (contentsSize + gapSize));
    if (align === SLIDER_ALIGN.CENTER) {
      const centerX = +(fullWidth / 2).toFixed(2) - +(contentsSize / 2).toFixed(2);
      return centerX - (contentsSize + gapSize) * currentIndex;
    }
  };

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
          transform: `translateX(${getTranslateX()}rem)`,
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
  onClick?: (type: SliderButtonType, currentIndex: number) => void;
  children: ReactNode;
}) => {
  const { actions, currentIndex, maxIndex } = useSliderStore();

  const isDisabled = () => {
    if (type === SLIDER_BUTTON_TYPE.LEFT) {
      return currentIndex <= 0;
    }
    if (type === SLIDER_BUTTON_TYPE.RIGHT) {
      return currentIndex < 0 || currentIndex >= maxIndex;
    }
  };

  const handleOnClick = () => {
    if (onClick) onClick(type, currentIndex);
    actions.moveIndex(type);
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
