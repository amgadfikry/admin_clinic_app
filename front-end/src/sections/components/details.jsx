/* eslint-disable react/prop-types */
function Details({ offer, state }) {
  const handleClose = () => {
    state("")
  }

  return (
    <div className="absolute z-10 bg-teal-color bg-opacity-30 h-full w-full flex justify-center items-center">
      <div className="bg-gray-200 rounded-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex
        md:flex-row flex-col overflow-hidden border border-gray-300 text-dark-color">
        <div className='flex-grow md:flex-grow-0 w-1/3 relative'>
          <img src={offer.image} alt='offer description' className='max-w-full h-auto block' />
          <p className='absolute top-1 left-1 bg-teal-color text-white font-medium px-3 py1'>{offer.percentage} %</p>
        </div>
        <div className='flex-grow md:flex-grow-0 md:w-2/3 px-4 py-6 relative'>
        <h3 className='font-medium text-xl'>{offer.title}</h3>
        <p className='mb-5 text-dark-color'>{offer.description}</p>
        <p className='line-through font-light'>{offer.old_price}</p>
        <p className='font-light'>{offer.new_price}</p>
        </div>

        <div className="flex justify-center items-center">
          <button className="py-1 px-1 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white absolute top-1 left-1" onClick={handleClose}>X</button>
        </div>

      </div>
    </div>
  )
}

export default Details