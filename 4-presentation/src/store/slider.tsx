import { create } from "zustand";

export const SLIDER_BUTTON_TYPE = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export const SLIDER_ALIGN = {
  FIRST: "first",
  CENTER: "center",
};

export type SliderButtonType = (typeof SLIDER_BUTTON_TYPE)[keyof typeof SLIDER_BUTTON_TYPE];
export type SliderAlignType = (typeof SLIDER_ALIGN)[keyof typeof SLIDER_ALIGN];

export interface SliderStoreState {
  currentIndex: number;
  maxIndex: number;
  contentsSize: number;
  gapSize: number;
  viewCount: number;
  align: SliderAlignType;
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
  align: SLIDER_ALIGN.FIRST,
};

const getNewIndex = (type: SliderButtonType, index: number, maxIndex: number) => {
  if (type === SLIDER_BUTTON_TYPE.LEFT) {
    return Math.max(index - 1, 0);
  }
  if (type === SLIDER_BUTTON_TYPE.RIGHT) {
    return Math.min(index + 1, maxIndex);
  }
};

export const createSliderStore = (initState: Partial<SliderStoreState>) =>
  create<SliderStore>((set) => ({
    ...SLIDER_STATE_INIT_DATA,
    ...initState,
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
