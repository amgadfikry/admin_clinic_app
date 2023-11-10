/* eslint-disable no-unused-vars */
import {
  useState, TextInput, SubmitBtn, baseUrl, useCookies, checkDataError, useNavigate, Header, SubHeader, handleCreate
} from '../../import'

function CreateSpeciality() {
  const [newSpeciality, setNewSpeciality] = useState({ 'name': '', 'price': '' })
  const [errorMsg, setErrorMsg] = useState({})
  const [successChanges, setSuccessChanges] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

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
    const options = {
      baseUrl: baseUrl, url: 'speciality', cookies: cookies, newSpeciality: newSpeciality, setNewSpeciality: setNewSpeciality,
      setErrorMsg: setErrorMsg, setSuccessChanges: setSuccessChanges, navigate: navigate, setServerError: setServerError, checkDataError: checkDataError
    }
    return (handleCreate(options))
  }

  return (
    <section className="flex flex-col px-3 md:px-5 pb-[100px]">
      <SubHeader subHead="Create new speciality" btnName='Back' btnPath='/dashboard/specialities' image={false} />
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