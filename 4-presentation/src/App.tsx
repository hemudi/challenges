import { useImageState } from "@store/image";
import MainPage from "@pages/MainPage";
import SliderPage from "@pages/SliderPage";

function App() {
  const { imageList } = useImageState();

  return (
    <div className="flex justify-center items-center p-5">
      <main className="flex flex-col justify-center items-center w-fit h-fit p-5 gap-5 border-2 rounded border-purple-500">
        {imageList.length === 0 ? <MainPage /> : <SliderPage />}
      </main>
    </div>
  );
}

export default App;
