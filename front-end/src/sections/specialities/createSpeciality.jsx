/* eslint-disable no-unused-vars */
import {
  Link, useState, TextInput, SubmitBtn, baseUrl, useCookies, checkDataError
} from '../../import'

function CreateSpeciality() {
  const [newSpeciality, setNewSpeciality] = useState({ 'name': '', 'price': '' })
  const [errorMsg, setErrorMsg] = useState({})
  const [successChanges, setSuccessChanges] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])

  const handleChangeSpeciality = (e) => {
    setNewSpeciality({ ...newSpeciality, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setNewSpeciality({ 'name': '', 'price': '' })
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({});
    const errors = checkDataError(newSpeciality, [])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    fetch(`${baseUrl}/api/admin/speciality`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSpeciality),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if ('error' in data) {
          setErrorMsg({ ...data.error })
        } else {
          setSuccessChanges(true)
          setErrorMsg({});
          setNewSpeciality({ 'name': '', 'price': '' })
          setTimeout(() => {
            setSuccessChanges(false)
          }, 2000)
        }
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  return (
    <section className="">
      <header className="flex justify-between items-center pb-3 border-b mb-8">
        <h1 className="text-3xl text-teal-color font-bold">New Speciality</h1>
        <Link to='/dashboard/specialities'>
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Back</button>
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Speciality Info</legend>
          <TextInput type='text' label='Speciality Name' placeholder='Enter Speciality name' id='name' value={newSpeciality.name}
            changeFunc={handleChangeSpeciality} error={errorMsg.name} className='' />
          <TextInput type='number' label='Price' placeholder='Enter default price' id='price' value={newSpeciality.price}
            changeFunc={handleChangeSpeciality} error={errorMsg.price} />
          <SubmitBtn value='Save Changes' error={errorMsg.all} cancel={handleCancel} success={successChanges}
            successMsg='Created successfully' />
        </fieldset>
      </form>
    </section>
  )
}

export default CreateSpeciality