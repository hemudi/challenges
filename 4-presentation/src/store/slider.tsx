import { create } from "zustand";

export const SLIDER_BUTTON_TYPE = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export type SliderButtonType = (typeof SLIDER_BUTTON_TYPE)[keyof typeof SLIDER_BUTTON_TYPE];

export interface SliderStoreState {
  currentIndex: number;
  maxIndex: number;
  contentsSize: number;
  gapSize: number;
  viewCount: number;
}

interface SliderAction {
  moveIndex: (direction: SliderButtonType) => void;
  setSliderState: (sliderState: Partial<SliderStoreState>) => void;
}

interface SliderStore extends SliderStoreState {
  actions: SliderAction;
}

const SLIDER_STATE_INIT_DATA: SliderStoreState = {
  currentIndex: -1,
  maxIndex: 0,
  contentsSize: 30,
  gapSize: 1,
  viewCount: 1,
};

const getNewIndex = (type: SliderButtonType, index: number, maxIndex: number) => {
  if (type === SLIDER_BUTTON_TYPE.LEFT) {
    return Math.max(index - 1, 0);
  }
  if (type === SLIDER_BUTTON_TYPE.RIGHT) {
    return Math.min(index + 1, maxIndex);
  }
};

const useSliderStore = create<SliderStore>((set) => ({
  ...SLIDER_STATE_INIT_DATA,
  actions: {
    moveIndex: (type: SliderButtonType) => {
      set(({ currentIndex, maxIndex }) => ({
        currentIndex: getNewIndex(type, currentIndex, maxIndex),
      }));
    },
    setSliderState: (newState: Partial<SliderStoreState>) => {
      set((state) => ({ ...state, ...newState }));
    },
  },
}));

export const useSliderStoreActions = () => useSliderStore((state) => state.actions);
export const useSliderCurrentIndex = () => useSliderStore(({ currentIndex }) => currentIndex);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useSliderState = () => useSliderStore(({ actions, ...state }) => state);
