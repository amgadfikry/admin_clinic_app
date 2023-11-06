/* eslint-disable react/prop-types */
function SubmitBtn({ value, error }) {
  return (
    <div className="flex flex-col">
      <input type="submit" value={value}
        className='bg-teal-color rounded-3xl px-4 py-1 text-white  cursor-pointer hover:border-dark-color 
            hover:bg-dark-color transition-all duration-300 border border-teal-color'></input>
      <div className="text-red-500 text-xs mt-2 h-2 text-right pr-2">{error}</div>
    </div>
  )
}

export default SubmitBtn