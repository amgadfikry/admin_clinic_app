/* eslint-disable no-unused-vars */
import {
  useState, useCookies, Link, baseUrl, SubmitBtn, TextInput, useNavigate,
  useLocation
} from '../../import'

function EditSpeciality() {
  const location = useLocation()
  const data = location.state
  const [editSpeciality, setEditSpeciality] = useState({ ...data })
  const [errorMsg, setErrorMsg] = useState({ 'name': '', 'price': '', 'all': '' })
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangeSpeciality = (e) => {
    setEditSpeciality({ ...editSpeciality, [e.target.name]: e.target.value })
  }
  const handleCancel = (e) => {
    e.preventDefault()
    setEditSpeciality({ ...data })
    setErrorMsg({ 'name': '', 'price': '', 'all': '' })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg((prevErrorMsg) => ({
      'name': '', 'price': '', 'all': ''
    }));
    let allFilled = true
    let same = 0
    for (let key in editSpeciality) {
      if (editSpeciality[key] === '') {
        allFilled = false
        setErrorMsg((prevErrorMsg) => ({
          ...prevErrorMsg,
          [key]: 'This field is required',
        }));
      }
      if (editSpeciality[key] === data[key]) {
        same++
      }
    }
    if (!allFilled) {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        'all': 'Fill in all required',
      }));
      return
    }
    if (same === Object.keys(editSpeciality).length) {
      setErrorMsg((prevErrorMsg) => ({
        'name': '', 'price': '', 'all': 'The Same input'
      }));
      return
    }

    fetch(`${baseUrl}/api/admin/speciality/${editSpeciality.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editSpeciality),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setErrorMsg((prevErrorMsg) => ({
          'name': '', 'price': '', 'all': ''
        }));
        setEditSpeciality({ ...data })
        navigate('/specialities')
      })
    console.log(editSpeciality)
  }

  return (
    <section className="">
      <header className="flex justify-between items-center pb-3 border-b mb-8">
        <h1 className="text-3xl text-teal-color font-bold">Edit {data.name}</h1>
        <Link to='/specialities'>
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Back</button>
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Speciality Info</legend>
          <TextInput type='text' label='Speciality Name' placeholder='Enter Speciality name' id='name' value={editSpeciality.name}
            changeFunc={handleChangeSpeciality} error={errorMsg.name} className='' />
          <TextInput type='number' label='Price' placeholder='Enter default price' id='price' value={editSpeciality.price}
            changeFunc={handleChangeSpeciality} error={errorMsg.price} />
          <div className='w-full flex justify-end items-start pr-2 pt-5 relative '>
            <input type="submit" value='Cancel' onClick={handleCancel}
              className='border border-teal-color rounded-3xl px-4 py-1 text-teal-color font-medium cursor-pointer ml-auto
            hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300 mr-2'></input>
            <SubmitBtn value='Save Changes' error={errorMsg.all} />
          </div>
        </fieldset>
      </form>
    </section>
  )
}

export default EditSpeciality