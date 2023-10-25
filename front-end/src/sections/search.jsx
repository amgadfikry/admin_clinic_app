import { TbCalendarPlus } from 'react-icons/tb'
import SearchForm from '../components/searchForm'

function Search() {

  return (
    <section className="bg-gray-color py-20 px-2">
      <div className="container mx-auto bg-white drop-shadow-lg rounded-lg py-3">
        <div className='flex items-center justify-center text-teal-color border-b pb-3'>
          <TbCalendarPlus className='font-[500] text-5xl mr-3' />
          <div className=''>
            <h3 className='font-[500] text-xl'>Book a doctor</h3>
            <p className='font-[300] text-sm'>Examination or procedure</p>
          </div>
        </div>
        <SearchForm />
      </div>
    </section>
  )
}

export default Search