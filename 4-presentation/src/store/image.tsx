import { create } from "zustand";

interface Image {
  id: number;
  name: string;
  file: File;
}

interface ImageStoreState {
  selectedImage: Image | null;
  imageList: Image[];
}

interface ImageStoreAction {
  initImageStore: () => void;
  addImage: (file: File) => void;
  selectImage: (image: Image) => void;
  removeImage: (image: Image) => void;
}

interface ImageStore extends ImageStoreState {
  actions: ImageStoreAction;
}

const IMAGE_STORE_INIT_DATA: ImageStoreState = {
  selectedImage: null,
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
        imageList: [...imageList, { id: imageList.length, name: file.name, file }],
      }));
    },
    selectImage: (image: Image) => {
      set(() => ({ selectedImage: image }));
    },
    removeImage: (image: Image) => {
      set(({ selectedImage, imageList }) => ({
        selectedImage: image.id === selectedImage?.id ? null : selectedImage,
        imageList: imageList.filter(({ id }) => image.id !== id),
      }));
    },
  },
}));

export const useImageList = () => useImageStore((state) => state.imageList);
export const useImageActions = () => useImageStore((state) => state.actions);
export const useSelectedImage = () => useImageStore((state) => state.selectedImage);
