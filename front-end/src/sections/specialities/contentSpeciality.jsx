/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  useState, Link, baseUrl, useCookies, LoadingComponent, AiOutlineDelete, AiOutlineEdit, ConfirmMsg, useEffect
} from '../../import'

function ContentSpeciality() {
  const [specialitiesData, setspecialitiesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState("")
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])

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
        const filterList = specialitiesData.filter(el => el.id !== confirmDelete)
        setConfirmDelete("")
        setspecialitiesData(filterList)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
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
        setspecialitiesData(data)
        setLoading(false)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }, [])

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <section className="">
        <header className="flex justify-between items-center pb-3 border-b mb-8">
          <h1 className="text-3xl text-teal-color font-bold">Specialities</h1>
          <Link to='/dashboard/specialities/create'>
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
                {specialitiesData.length === 0
                  ? (<tr>
                    <td colSpan="7" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                      No current specialities
                    </td>
                  </tr>)
                  : (specialitiesData.map((speciality, index) => (
                    <tr key={speciality.id} className=" even:bg-gray-200 relative">
                      {confirmDelete == speciality.id && <ConfirmMsg state={setConfirmDelete} func={functionDelete} />}
                      <th className="flex gap-3 px-6 py-4 font-norma">{index + 1}</th>
                      <td className="px-6 py-4 ">{speciality.name}</td>
                      <td className="px-6 py-4">{speciality.price}</td>
                      <td className="px-6 py-4">{speciality.doctors}</td>
                      <td className="px-6 py-4" >{speciality.offers}</td>
                      <td className="px-6 py-4">
                        <Link to={`/dashboard/specialities/edit/${speciality.name}`} state={speciality}>
                          <AiOutlineEdit className='text-[24px] text-teal-color cursor-pointer' />
                        </Link>
                      </td>
                      <td className="px-2 py-4">
                        <AiOutlineDelete className='text-[24px] text-dark-color cursor-pointer'
                          onClick={handleDelete} id={speciality.id} />
                      </td>
                    </tr>
                  )
                  ))
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
