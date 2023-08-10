import FileImage from "@components/FileImage";
import ImageUploader from "@components/ImageUploader";
import Slider from "@components/Slider";
import { useImageActions, useImageState } from "@store/image";
import { SLIDER_ALIGN, SLIDER_BUTTON_TYPE, SliderButtonType } from "@store/slider";

const IMAGE_SIZE = {
  BIG: 30,
  SMALL: 10,
};

const SliderPage = () => {
  const { imageList, selectedIndex } = useImageState();
  const { selectImage, removeImage } = useImageActions();

  const handleSliderButton = (type: SliderButtonType, currentIndex: number) => {
    selectImage(type === SLIDER_BUTTON_TYPE.LEFT ? currentIndex - 1 : currentIndex + 1);
  };

  const handleClickImage = (id: number) => {
    if (id !== selectedIndex) selectImage(id);
  };

  const handleClickRemove = (id: number) => {
    removeImage(id);
  };

  return (
    <>
      <Slider
        currentIndex={selectedIndex}
        maxIndex={imageList.length - 1}
        contentsSize={IMAGE_SIZE.BIG}
        gapSize={1}
      >
        <Slider.Button type={SLIDER_BUTTON_TYPE.LEFT} onClick={handleSliderButton}>
          이전
        </Slider.Button>
        <Slider.Display>
          {imageList &&
            imageList.map(({ index, file }) => (
              <li
                key={index}
                className={`flex justify-center items-center`}
                style={{ width: `${IMAGE_SIZE.BIG}rem`, height: `${IMAGE_SIZE.BIG}rem` }}
              >
                <FileImage className={`w-full h-full object-fit object-contain`} file={file} />
              </li>
            ))}
        </Slider.Display>
        <Slider.Button type={SLIDER_BUTTON_TYPE.RIGHT} onClick={handleSliderButton}>
          다음
        </Slider.Button>
      </Slider>
      <Slider
        currentIndex={selectedIndex}
        maxIndex={imageList.length - 1}
        contentsSize={IMAGE_SIZE.SMALL}
        gapSize={1}
        viewCount={5}
        align={SLIDER_ALIGN.CENTER}
      >
        <Slider.Display>
          {imageList &&
            imageList.map(({ index, file }) => (
              <li
                key={index}
                className={`flex relative group justify-center items-center cursor-pointer border-purple-500 rounded ${
                  index === selectedIndex ? "border-2" : ""
                }`}
                style={{ width: `${IMAGE_SIZE.SMALL}rem`, height: `${IMAGE_SIZE.SMALL}rem` }}
                onClick={() => handleClickImage(index)}
              >
                <button
                  className="hidden absolute top-1 right-1 group-hover:block bg-red-600 text-white rounded w-6 h-6"
                  onClick={() => handleClickRemove(index)}
                >
                  X
                </button>
                <FileImage className={`w-full h-full object-fit object-contain`} file={file} />
              </li>
            ))}
        </Slider.Display>
      </Slider>
      <span className="text-l">{`${selectedIndex + 1} / ${imageList.length}`}</span>
      <ImageUploader />
    </>
  );
};

export default SliderPage;
