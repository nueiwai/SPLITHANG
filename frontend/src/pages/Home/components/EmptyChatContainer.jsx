import { animationDefaultOptions } from "../../../lib/utils";
import Lottie from "react-lottie";

function EmptyChatContainer() {
  return (
    <div class="flex-1 md:bg-blue-800 md:flex flex-col justify-center items-center hidden">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="moderustic-thin">
          Hi<span className="text-blue-400">!</span> <span> </span>
          Welcome to
          <span className="text-blue-400"> SplitHang </span>
        </h3>
      </div>
    </div>
  );
}

export default EmptyChatContainer;
