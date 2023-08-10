import { create } from "zustand";

interface Image {
  index: number;
  file: File;
}

interface ImageStoreState {
  selectedIndex: number;
  imageList: Image[];
}

interface ImageStoreAction {
  addImage: (file: File) => void;
  selectImage: (index: number) => void;
  removeImage: (index: number) => void;
}

interface ImageStore extends ImageStoreState {
  actions: ImageStoreAction;
}

const IMAGE_STORE_INIT_DATA: ImageStoreState = {
  selectedIndex: -1,
  imageList: [],
};

const useImageStore = create<ImageStore>((set) => ({
  ...IMAGE_STORE_INIT_DATA,
  actions: {
    addImage: (file: File) => {
      set(({ imageList }) => ({
        imageList: [...imageList, { index: imageList.length, file }],
        selectedIndex: imageList.length,
      }));
    },
    selectImage: (index: number) => {
      set(() => ({ selectedIndex: index }));
    },
    removeImage: (index: number) => {
      set(({ selectedIndex, imageList }) => ({
        selectedIndex: index === selectedIndex ? Math.max(selectedIndex - 1, 0) : selectedIndex,
        imageList: imageList.reduce<Image[]>((prev, cur) => {
          if (cur.index === index) return prev;
          prev.push({ ...cur, index: prev.length });
          return prev;
        }, []),
      }));
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useImageState = () => useImageStore(({ actions, ...state }) => state);
export const useImageActions = () => useImageStore((state) => state.actions);
