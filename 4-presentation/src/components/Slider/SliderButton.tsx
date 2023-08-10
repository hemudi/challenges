import { useImageActions, useImageList, useSelectedImageId } from "@store/image";

export const BUTTON_TYPE = {
  LEFT: "left",
  RIGHT: "right",
} as const;

const BUTTON_TEXT = {
  [BUTTON_TYPE.LEFT]: "이전",
  [BUTTON_TYPE.RIGHT]: "다음",
};

type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];

interface SliderButtonProps {
  type: ButtonType;
}

const getNewId = (type: ButtonType, id: number) => (type === BUTTON_TYPE.LEFT ? id - 1 : id + 1);

const isDisabled = (type: ButtonType, id: number, maxId: number) => {
  if (type === BUTTON_TYPE.LEFT) {
    return id <= 0;
  }
  if (type === BUTTON_TYPE.RIGHT) {
    return id < 0 || id >= maxId;
  }
};

const SliderButton = ({ type }: SliderButtonProps) => {
  const imageList = useImageList();
  const selectedId = useSelectedImageId();
  const { selectImageId } = useImageActions();

  return (
    <button
      className="h-fit cursor-pointer items-center justify-center rounded enabled:bg-purple-400 p-3 text-white enabled:hover:bg-purple-600 enabled:active:bg-purple-500 disabled:bg-purple-200"
      onClick={() => {
        selectImageId(getNewId(type, selectedId));
      }}
      disabled={isDisabled(type, selectedId, imageList.length - 1)}
    >
      {BUTTON_TEXT[type]}
    </button>
  );
};

export default SliderButton;
