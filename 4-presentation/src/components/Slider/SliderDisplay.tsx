import FileImage from "@components/FileImage";
import { useImageList, useSelectedImageId } from "@store/image";

const CONTENTS_SIZE = 30;

const SliderDisplay = () => {
  const imageList = useImageList();
  const selectedId = useSelectedImageId();

  return (
    <div className={`relative w-[30rem] h-[30rem] overflow-hidden`}>
      <ul
        style={{
          width: `${(imageList.length || 1) * CONTENTS_SIZE}rem`,
          transform: `translateX(${-(selectedId * (100 / imageList.length))}%)`,
        }}
        className={`flex h-full items-center transition duration-150 ease-in`}
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
