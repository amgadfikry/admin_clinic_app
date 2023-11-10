/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect, useState, Link, baseUrl, useCookies, LoadingComponent, ConfirmMsg, Stars, Details
} from '../../import'

function ContentDoctor() {
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState("")
  const [doctorData, setDoctorData] = useState([])
  const [seeDetails, setSeeDetails] = useState("")
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])

  const handleDelete = (e) => {
    setConfirmDelete(e.target.id)
  }

  const functionDelete = () => {
    fetch(`${baseUrl}/api/admin/doctor/${confirmDelete}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        const filterList = doctorData.filter(el => el.id !== confirmDelete)
        setConfirmDelete("")
        setDoctorData(filterList)
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/doctor`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setDoctorData(data)
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
          <h1 className="text-3xl text-teal-color font-bold">Doctors</h1>
          <Link to='/dashboard/doctors/create'>
            <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Create new</button>
          </Link>
        </header>
        <div className="rounded-lg  overflow-hidden drop-shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-color text-center text-sm text-dark-color ">
              <thead className="bg-teal-color text-white">
                <tr className='whitespace-nowrap'>
                  <th scope="col" className="px-2 py-4 font-bold">#</th>
                  <th scope="col" className="px-2 py-4 font-bold">Name</th>
                  <th scope="col" className="px-2 py-4 font-bold">Speciality</th>
                  <th scope="col" className="px-2 py-4 font-bold">Title</th>
                  <th scope="col" className="px-2 py-4 font-bold">Price</th>
                  <th scope="col" className="px-2 py-4 font-bold">Stars</th>
                  <th scope="col" className="px-2 py-4 font-bold">Visits</th>
                  <th scope="col" className="px-2 py-4 font-bold">Dates</th>
                  <th scope="col" className="px-2 py-4 font-bold">Reviews</th>
                  <th scope="col" className="px-2 py-4 font-bold">Details</th>
                  <th scope="col" className="px-2 py-4 font-bold">Edit</th>
                  <th scope="col" className="px-2 py-4 font-bold">Delete</th>
                </tr>
              </thead>
              <tbody className=" text-dark-color ">
                {doctorData.length === 0
                  ? (<tr>
                    <td colSpan="12" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                      No current Doctors
                    </td>
                  </tr>)
                  : (doctorData.map((doctor, index) => (
                    <tr key={doctor.id} className="even:bg-gray-200 relative whitespace-nowrap font-medium px-4">
                      {seeDetails == doctor.id && <Details state={setSeeDetails} details={doctor.details} />}
                      {confirmDelete == doctor.id && <ConfirmMsg state={setConfirmDelete} func={functionDelete} />}
                      <th className=" px-2 py-2 bg-gray-300">{index + 1}</th>
                      <td className="px-2 py-2 ">{doctor.full_name}</td>
                      <td className="px-2 py-2">{doctor.speciality_id}</td>
                      <td className="px-2 py-2">{doctor.title}</td>
                      <td className="px-2 py-2" >{doctor.price}</td>
                      <td className="px-2 py-2" >
                        <Stars starsNumber={doctor.stars} /> </td>
                      <td className="px-2 py-2" >{doctor.appointments}</td>
                      <td className="px-2 py-2 whitespace-wrap" >
                        <div className="flex justify-center">
                          <p className="whitespace-nowrap border border-teal-color rounded-md py-2 px-1 cursor-pointer
                          hover:bg-teal-color hover:text-white transition-all duration-200">
                            <span className='font-bold text-2xl'>+</span><br />Add<br />new<br />date
                          </p>
                          {doctor.all_times.map((time, index) => (
                            <p key={index} className="whitespace-nowrap">{time.day} from {time.start} to {time.end}</p>
                          ))}
                        </div>
                      </td>
                      <td className="px-2 py-2" >
                        <p className='review-btn'>Reviews</p>
                      </td>
                      <td className="px-2 py-2" >
                        <p className='details-btn' id={doctor.id} onClick={(e) => setSeeDetails(e.target.id)}>Details</p>
                      </td>
                      <td className="px-2 py-2">
                        <Link to={`/dashboard/doctors/edit/${doctor.full_name}`} state={doctor} >
                          <p className='edit-btn'>Edit</p>
                        </Link>
                      </td>
                      <td className="px-2 py-2">
                        <p className='delete-btn' onClick={handleDelete} id={doctor.id}>Delete</p>
                      </td>
                    </tr>
                  )))
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }
}

export default ContentDoctor