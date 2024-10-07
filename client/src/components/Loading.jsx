import loadingBg from "../assets/loading-bg.jpg"
import Image from "./Image"

const Loading = () => {
  return (
    <div className="relative h-screen flex justify-center items-center select-none">
      <Image
        src={loadingBg}
        hash="L745:+*JHXIB%}t7RiRjL#R5k;o|"
        style="absolute w-full h-screen object-cover"
      />
      <div className="absolute h-screen flex flex-col justify-center items-center z-10">
        <h1 className="font-poppins-medium text-[128px] text-white">Loading</h1>
      </div>
    </div>
  )
}

export default Loading
