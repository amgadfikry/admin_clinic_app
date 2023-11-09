/* eslint-disable no-unused-vars */
import {
  Link, useState, TextInput, SubmitBtn, baseUrl, useCookies, Selectspeciality, BiSolidCloudUpload,
  checkDataError
} from '../../import'

function CreateDoctor() {
  const emptyDoctor = { 'full_name': '', 'title': '', 'price': null, 'details': '', 'speciality_id': '' }
  const [newDoctor, setNewDoctor] = useState({ ...emptyDoctor })
  const [errorMsg, setErrorMsg] = useState({})
  const [successChanges, setSuccessChanges] = useState(false)
  const [speciality, setSpeciality] = useState('')
  const [specialityPrice, setSpecialityPrice] = useState('Default speciality price')
  const [cookies] = useCookies(['token'])

  const handleChangeDoctors = (e) => {
    e.preventDefault()
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setNewDoctor({ ...emptyDoctor })
    setSpeciality("")
    setErrorMsg({})
    setSpecialityPrice('Default speciality price')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({});
    const errors = checkDataError(newDoctor, ['price'])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    fetch(`${baseUrl}/api/admin/doctor`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDoctor),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setSuccessChanges(true)
        setErrorMsg({});
        setNewDoctor({ ...emptyDoctor })
        setSpeciality("")
        setSpecialityPrice('Default speciality price')
        setTimeout(() => {
          setSuccessChanges(false)
        }, 2000)
      })
  }

  return (
    <section className="">
      <header className="flex justify-between items-center pb-3 border-b mb-8">
        <h1 className="text-3xl text-teal-color font-bold">New Doctor</h1>
        <Link to='/doctors'>
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Back</button>
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Doctor Info</legend>
          <TextInput type='text' label='Doctor name' placeholder='Enter Doctor full name' id='full_name' value={newDoctor.full_name}
            changeFunc={handleChangeDoctors} error={errorMsg.full_name} />
          <TextInput type='text' label='Title' placeholder='Enter doctor title' id='title' value={newDoctor.title}
            changeFunc={handleChangeDoctors} error={errorMsg.title} />
          <TextInput type='number' label='Price' placeholder={specialityPrice}
            id='price' value={newDoctor.price} changeFunc={handleChangeDoctors} error={errorMsg.price} />
          <Selectspeciality specialityValue={newDoctor} setSpecialityValue={setNewDoctor} error={errorMsg}
            speciality={speciality} setSpeciality={setSpeciality} setSpecialityPrice={setSpecialityPrice} />
          <p className='flex flex-col space-y-1 w-full shrink-0'>
            <textarea className='outline-none resize-none border rounded-lg p-3'
              placeholder='Enter more details about doctor' rows={5} name='details' id='details' value={newDoctor.details}
              onChange={handleChangeDoctors}></textarea>
            <span className='text-xs text-red-500 pl-1 h-2'>{errorMsg.details}</span>
          </p>
          <div className='w-full shrink-0 py-4 px-3 text-center border rounded-lg bg-white'>
            <input type='file' name='image' id='image' className='hidden' disabled />
            <label htmlFor='image' className='flex justify-center items-center border w-fit mx-auto py-2 px-4
          bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200'>
              <BiSolidCloudUpload className='text-2xl text-teal-color mr-3' />
              <p>Choose a offer photo</p>
            </label>
          </div>
          <SubmitBtn value='Create' error={errorMsg.all} cancel={handleCancel} success={successChanges}
            successMsg='Created successfully' />
        </fieldset>
      </form>
    </section>
  )
}

export default CreateDoctor