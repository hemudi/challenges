import { create } from "zustand";

interface Image {
  id: number;
  name: string;
  file: File;
}

interface ImageStoreState {
  selectedImageId: number;
  imageList: Image[];
}

interface ImageStoreAction {
  initImageStore: () => void;
  addImage: (file: File) => void;
  selectImageId: (id: number) => void;
  removeImage: (id: number) => void;
}

interface ImageStore extends ImageStoreState {
  actions: ImageStoreAction;
}

const IMAGE_STORE_INIT_DATA: ImageStoreState = {
  selectedImageId: -1,
  imageList: [],
};

const useImageStore = create<ImageStore>((set) => ({
  ...IMAGE_STORE_INIT_DATA,
  actions: {
    initImageStore: () => {
      set(() => ({ ...IMAGE_STORE_INIT_DATA }));
    },
    addImage: (file: File) => {
      set(({ imageList }) => ({
        imageList: [...imageList, { id: imageList.length, name: file.name.split(".")[0], file }],
        selectedImageId: imageList.length,
      }));
    },
    selectImageId: (id: number) => {
      set(() => ({ selectedImageId: id }));
    },
    removeImage: (id: number) => {
      set(({ selectedImageId, imageList }) => ({
        selectedImageId: id === selectedImageId ? Math.max(selectedImageId - 1, 0) : selectedImageId,
        imageList: imageList.reduce<Image[]>((prev, cur) => {
          if (cur.id === id) return prev;
          prev.push({ ...cur, id: prev.length });
          return prev;
        }, []),
      }));
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useImageState = () => useImageStore(({ actions, ...state }) => state);
export const useImageActions = () => useImageStore((state) => state.actions);
