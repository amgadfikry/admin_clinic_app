function ComingSoon() {
  return (
    <div className="relative w-full flex items-center justify-center bg-cover bg-center
    text-center px-5 z-[-5] pt-[100px] pl-[70px] pb-[50px] pr-[20px] min-h-screen">
      <div className="absolute top-0 right-0 bottom-0 left-0  opacity-75"></div>
      <div className="z-50 flex flex-col justify-center text-teal-color">
        <h1 className="text-5xl mb-1">We are <b>Almost</b> there!</h1>
        <p>Stay tuned for amazing features!!!</p>
        <div className="mt-10 mb-5">
          <div className="shadow w-full bg-gray-300 mt-2 max-w-2xl mx-auto rounded-full">
            <div className="rounded-full bg-teal-color text-xs leading-none text-center text-white py-1 w-[75%]">75%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon