import InputDiv from "./inputDiv"
import SelectDiv from "./selectDiv"

function SearchForm() {
  return (
    <form className='flex flex-col p-3 space-y-3 md:flex-row md:space-y-0'>
      <SelectDiv className='md:flex-1' />
      <InputDiv className='md:flex-1' />
      <button type='submit' className='bg-teal-color text-white py-2 rounded-lg  md:rounded-l-none md:flex-grow
        font-[500] text-lg hover:bg-yellow-color hover:text-dark-color transition-all duration-300'>Search</button>
    </form>
  )
}

export default SearchForm