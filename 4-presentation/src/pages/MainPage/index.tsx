import ImageUploader from "@components/ImageUploader";

const MainPage = () => {
  return (
    <div className="w-96 h-96 flex flex-col items-center gap-10 justify-center">
      <h1 className="font-bold text-xl text-purple-900">4th Challenge - Presentation</h1>
      <ImageUploader />
    </div>
  );
};

export default MainPage;
