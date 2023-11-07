/* eslint-disable no-unused-vars */
import {
  Link, useState, TextInput, SubmitBtn, baseUrl, useCookies
} from '../../import'

function CreateSpeciality() {
  const [newSpeciality, setNewSpeciality] = useState({ 'name': '', 'price': '' })
  const [errorMsg, setErrorMsg] = useState({ 'name': '', 'price': '', 'all': '' })
  const [cookies] = useCookies(['token'])

  const handleChangeSpeciality = (e) => {
    setNewSpeciality({ ...newSpeciality, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setNewSpeciality({ 'name': '', 'price': '' })
    setErrorMsg({ 'name': '', 'price': '', 'all': '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg((prevErrorMsg) => ({
      'name': '', 'price': '', 'all': ''
    }));
    let allFilled = true
    for (let key in newSpeciality) {
      if (newSpeciality[key] === '') {
        allFilled = false
        setErrorMsg((prevErrorMsg) => ({
          ...prevErrorMsg,
          [key]: 'This field is required',
        }));
      }
    }
    if (!allFilled) {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        'all': 'Fill in all required',
      }));
      return
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
        if ('msg' in data) {
          setErrorMsg((prevErrorMsg) => ({
            ...prevErrorMsg,
            'all': data.msg,
          }));
        } else {
          setErrorMsg((prevErrorMsg) => ({
            'name': '', 'price': '', 'all': ''
          }));
          setNewSpeciality({ 'name': '', 'price': '' })
        }
      })
  }

  return (
    <section className="">
      <header className="flex justify-between items-center pb-3 border-b mb-8">
        <h1 className="text-3xl text-teal-color font-bold">New Speciality</h1>
        <Link to='/specialities'>
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
          <div className='w-full flex justify-end items-start pr-2 pt-5 relative '>
            <input type="submit" value='Cancel' onClick={handleCancel}
              className='border border-teal-color rounded-3xl px-4 py-1 text-teal-color font-medium cursor-pointer ml-auto
            hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300 mr-2'></input>
            <SubmitBtn value='Create' error={errorMsg.all} />
          </div>
        </fieldset>
      </form>
    </section>
  )
}

export default CreateSpeciality