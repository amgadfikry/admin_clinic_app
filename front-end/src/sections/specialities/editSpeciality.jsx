/* eslint-disable no-unused-vars */
import {
  useState, useCookies, Link, baseUrl, SubmitBtn, TextInput, useNavigate,
  useLocation, checkDataError, samilarData
} from '../../import'

function EditSpeciality() {
  const location = useLocation()
  const specialityData = location.state
  delete specialityData.offers
  delete specialityData.doctors
  const [changeSpeciality, setChangeSpeciality] = useState({ ...specialityData })
  const [errorMsg, setErrorMsg] = useState({})
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangeSpeciality = (e) => {
    setChangeSpeciality({ ...changeSpeciality, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setChangeSpeciality({ ...specialityData })
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({});
    const errors = checkDataError(changeSpeciality, [])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({...errors})
      return;
    }
    const errorSame = samilarData(changeSpeciality, specialityData)
    if (Object.keys(errorSame).length > 0) {
      setErrorMsg({...errorSame})
      return;
    }
    fetch(`${baseUrl}/api/admin/speciality/${specialityData.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changeSpeciality),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setErrorMsg({});
        setChangeSpeciality({ ...data })
        navigate('/specialities')
      })
  }

  return (
    <section className="">
      <header className="flex justify-between items-center pb-3 border-b mb-8">
        <h1 className="text-3xl text-teal-color font-bold">Edit {specialityData.name}</h1>
        <Link to='/specialities'>
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Back</button>
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Speciality Info</legend>
          <TextInput type='text' label='Speciality Name' placeholder='Enter Speciality name' id='name' value={changeSpeciality.name}
            changeFunc={handleChangeSpeciality} error={errorMsg.name} className='' />
          <TextInput type='number' label='Price' placeholder='Enter default price' id='price' value={changeSpeciality.price}
            changeFunc={handleChangeSpeciality} error={errorMsg.price} />
          <SubmitBtn value='Update' error={errorMsg.all} cancel={handleCancel}
            success={false} successMsg=''/>
        </fieldset>
      </form>
    </section>
  )
}

export default EditSpeciality