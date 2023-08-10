import FileImage from "@components/FileImage";
import ImageUploader from "@components/ImageUploader";
import Slider from "@components/Slider";
import { useImageActions, useImageState } from "@store/image";
import { SLIDER_ALIGN, SLIDER_BUTTON_TYPE, SliderButtonType } from "@store/slider";

const SliderPage = () => {
  const { imageList, selectedImageId } = useImageState();
  const { selectImageId } = useImageActions();

  const handleSliderButton = (type: SliderButtonType, currentIndex: number) => {
    selectImageId(type === SLIDER_BUTTON_TYPE.LEFT ? currentIndex - 1 : currentIndex + 1);
  };

  return (
    <>
      <Slider currentIndex={selectedImageId} maxIndex={imageList.length - 1} contentsSize={30} gapSize={1}>
        <Slider.Button type={SLIDER_BUTTON_TYPE.LEFT} onClick={handleSliderButton}>
          이전
        </Slider.Button>
        <Slider.Display>
          {imageList &&
            imageList.map(({ id, file }) => (
              <li
                key={id}
                className={`flex justify-center items-center`}
                style={{ width: `${30}rem`, height: `${30}rem` }}
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
        currentIndex={selectedImageId}
        maxIndex={imageList.length - 1}
        contentsSize={10}
        gapSize={1}
        viewCount={5}
        align={SLIDER_ALIGN.CENTER}
      >
        <Slider.Display>
          {imageList &&
            imageList.map(({ id, file }) => (
              <li
                key={id}
                className={`flex justify-center items-center ${id === selectedImageId ? "border-2" : ""}`}
                style={{ width: `${10}rem`, height: `${10}rem` }}
              >
                <FileImage className={`w-full h-full object-fit object-contain`} file={file} />
              </li>
            ))}
        </Slider.Display>
      </Slider>
      <ImageUploader />
    </>
  );
};

export default SliderPage;
