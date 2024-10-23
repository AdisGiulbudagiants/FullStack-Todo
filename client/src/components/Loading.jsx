const Loading = () => {
  return (
    <div className="relative h-screen flex justify-center items-center select-none bg-cyan-700">
      <div className="absolute h-screen flex flex-col justify-center items-center z-10">
        <h1 className="font-poppins-medium text-[128px] text-white">Loading</h1>
      </div>
    </div>
  )
}

export default Loading
