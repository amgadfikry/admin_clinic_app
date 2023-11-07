/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  useEffect, setspecialitiesData, specialitiesDataState, useSelector, useDispatch, useState, Link, baseUrl, useCookies,
  AiOutlineDelete, AiOutlineEdit, LoadingComponent, ConfirmMsg, deleteSpeciality
} from '../../import'

function ContentSpeciality() {
  const dispatch = useDispatch()
  const specialitiesData = useSelector(specialitiesDataState)
  const [loading, setLoading] = useState(true)
  const [cookies] = useCookies(['token'])
  const [confirmDelete, setConfirmDelete] = useState("")

  const handleDelete = (e) => {
    setConfirmDelete(e.target.id)
  }

  const functionDelete = () => {
    fetch(`${baseUrl}/api/admin/speciality/${confirmDelete}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        dispatch(deleteSpeciality(confirmDelete))
        setConfirmDelete("")
      })
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/speciality`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        dispatch(setspecialitiesData(data))
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <section className="relative">
        {confirmDelete && <ConfirmMsg state={setConfirmDelete} func={functionDelete} />}
        <header className="flex justify-between items-center pb-3 border-b mb-8">
          <h1 className="text-3xl text-teal-color font-bold">Specialities</h1>
          <Link to='/specialities/create'>
            <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Create new</button>
          </Link>
        </header>
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-color drop-shadow-lg text-left text-sm text-dark-color ">
              <thead className="bg-teal-color text-white">
                <tr className='even:bg-yellow-color'>
                  <th scope="col" className="px-6 py-4 font-medium">#</th>
                  <th scope="col" className="px-6 py-4 font-medium">Name</th>
                  <th scope="col" className="px-6 py-4 font-medium">Price</th>
                  <th scope="col" className="px-6 py-4 font-medium">Doctors</th>
                  <th scope="col" className="px-6 py-4 font-medium">Offers</th>
                  <th scope="col" className="px-6 py-4 font-medium">Edit</th>
                  <th scope="col" className="px-2 py-4 font-medium">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100 text-dark-color ">
                {
                  specialitiesData.map((speciality, index) => {
                    return (
                      <tr key={speciality.id} className=" even:bg-gray-200">
                        <th className="flex gap-3 px-6 py-4 font-norma">{index + 1}</th>
                        <td className="px-6 py-4 ">{speciality.name}</td>
                        <td className="px-6 py-4">{speciality.price}</td>
                        <td className="px-6 py-4">{speciality.doctors}</td>
                        <td className="px-6 py-4" >{speciality.offers}</td>
                        <td className="px-6 py-4">
                          <Link to={`/specialities/edit/${speciality.name}`} state={speciality}>
                            <AiOutlineEdit className='text-[24px] text-teal-color cursor-pointer' />
                          </Link>
                        </td>
                        <td className="px-2 py-4">
                          <AiOutlineDelete className='text-[24px] text-dark-color cursor-pointer'
                            onClick={handleDelete} id={speciality.id} />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }
}

export default ContentSpeciality
