/* eslint-disable react/prop-types */
function Details({ details, state }) {
  const handleClose = () => {
    state("")
  }

  return (
    <td className="absolute justify-center items-center top-1/2 left-1/2 drop-shadow-lg flex z-10
      translate-x-[-50%] translate-y-[-50%]">
      <div className="bg-gray-200 min-w-[300px] max-w-[600px] py-6 px-8 rounded-lg ">
        <p className='mb-5 text-dark-color'>{details}</p>
        <div className="flex justify-center items-center">
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white" onClick={handleClose}>Close</button>
        </div>
      </div>
    </td>
  )
}

export default Details