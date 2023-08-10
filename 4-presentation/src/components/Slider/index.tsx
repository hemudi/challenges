import SliderButton, { BUTTON_TYPE } from "@components/Slider/SliderButton";
import SliderDisplay from "@components/Slider/SliderDisplay";

const Slider = () => {
  return (
    <div className="flex w-full justify-center items-center gap-8">
      <SliderButton type={BUTTON_TYPE.LEFT} />
      <SliderDisplay />
      <SliderButton type={BUTTON_TYPE.RIGHT} />
    </div>
  );
};

export default Slider;
