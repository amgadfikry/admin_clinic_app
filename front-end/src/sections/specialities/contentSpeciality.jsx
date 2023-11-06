/* eslint-disable no-unused-vars */
import {
  useEffect, setspecialitiesData, specialitiesDataState, useSelector, useDispatch, useState, Link
} from '../../import'

function ContentSpeciality() {
  const dispatch = useDispatch()
  const specialitiesData = useSelector(specialitiesDataState)
  const [loading, setLoading] = useState(true)

  return (
    <section className="py-10 px-3 bg-gray-color min-h-screen">
      <header className="flex justify-between items-center pb-3 border-b mb-8">
        <h1 className="text-3xl text-teal-color font-bold">Specialities</h1>
        <Link to='/specialities/create'>
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Create new</button>
        </Link>
      </header>
      <div className="rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white text-left text-sm text-dark-color">
            <thead className="bg-teal-color text-white">
              <tr className='even:bg-yellow-color'>
                <th scope="col" className="px-6 py-4 font-medium">#</th>
                <th scope="col" className="px-6 py-4 font-medium">Name</th>
                <th scope="col" className="px-6 py-4 font-medium">Price</th>
                <th scope="col" className="px-6 py-4 font-medium">Doctors</th>
                <th scope="col" className="px-6 py-4 font-medium">Offers</th>
                <th scope="col" className="px-6 py-4 font-medium"></th>
                <th scope="col" className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100 text-dark-color">
              <tr className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-norma"></th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ContentSpeciality
