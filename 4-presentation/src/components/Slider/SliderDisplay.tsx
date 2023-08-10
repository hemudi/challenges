import FileImage from "@components/FileImage";
import { useImageList, useSelectedImageId } from "@store/image";

const CONTENTS_SIZE = 30;

const getListStyle = (selectedId: number, contentsSize: number, contentsCount: number) => {
  const width = `${(contentsCount || 1) * contentsSize + contentsCount - 1}rem`;
  const transform =
    selectedId === 0 ? "translateX(0)" : `translateX(${-(selectedId * contentsSize + selectedId)}rem)`;
  return {
    width,
    transform,
  };
};

const SliderDisplay = () => {
  const imageList = useImageList();
  const selectedId = useSelectedImageId();

  return (
    <div className={`relative w-[30rem] h-[30rem] overflow-hidden border`}>
      <ul
        style={getListStyle(selectedId, CONTENTS_SIZE, imageList.length)}
        className={`flex h-full items-center transition duration-150 ease-in gap-4`}
      >
        {imageList &&
          imageList.map(({ id, file }) => (
            <li key={id} className={`flex w-[30rem] h-[30rem] justify-center items-center`}>
              <FileImage className={`w-full h-full object-fit object-contain`} file={file} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SliderDisplay;
