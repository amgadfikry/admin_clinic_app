/* eslint-disable no-unused-vars */
import {
  Link, useState, TextInput, SubmitBtn, baseUrl, useCookies, Selectspeciality, BiSolidCloudUpload,
  specialitiesDataState, useSelector
} from '../../import'

function CreateOffer() {
  const specialitiesData = useSelector(specialitiesDataState)
  const [newOffer, setNewOffer] = useState({
    'title': '', 'old_price': '', 'new_price': '', 'description': '',
    'speciality': '', 'expire_date': ''
  })
  const [errorMsg, setErrorMsg] = useState({
    'title': '', 'old_price': '', 'new_price': '', 'description': '',
    'speciality': '', 'expire_date': '', 'all': ''
  })
  const [cookies] = useCookies(['token'])

  const handleChangeOffers = (e) => {
    if (e.target.name === 'old_price' || e.target.name === 'new_price') {
      setNewOffer({ ...newOffer, [e.target.name]: parseInt(e.target.value) })
      return
    }
    setNewOffer({ ...newOffer, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setNewOffer({
      'title': '', 'old_price': '', 'new_price': '', 'description': '',
      'speciality': '', 'expire_date': ''
    })
    setErrorMsg({
      'title': '', 'old_price': '', 'new_price': '', 'description': '',
      'speciality': '', 'expire_date': '', 'all': ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg((prevErrorMsg) => ({
      'title': '', 'old_price': '', 'new_price': '', 'description': '',
      'speciality': '', 'expire_date': '', 'all': ''
    }));
    let allFilled = true
    for (let key in newOffer) {
      if (newOffer[key] === '') {
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
    const id = specialitiesData.find(speciality => speciality.name === newOffer.speciality).id
    newOffer.speciality = id
    fetch(`${baseUrl}/api/admin/offer`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOffer),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        setErrorMsg((prevErrorMsg) => ({
          'title': '', 'old_price': '', 'new_price': '', 'description': '',
          'speciality': '', 'expire_date': '', 'all': ''
        }));
        setNewOffer({
          'title': '', 'old_price': '', 'new_price': '', 'description': '',
          'speciality': '', 'expire_date': ''
        })
      })
  }

  return (
    <section className="">
      <header className="flex justify-between items-center pb-3 border-b mb-8">
        <h1 className="text-3xl text-teal-color font-bold">New Offer</h1>
        <Link to='/offers'>
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Back</button>
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Offer Info</legend>
          <TextInput type='text' label='Offer title' placeholder='Enter offer title' id='title' value={newOffer.title}
            changeFunc={handleChangeOffers} error={errorMsg.title} />
          <TextInput type='number' label='Old price' placeholder='Enter old price' id='old_price' value={newOffer.old_price}
            changeFunc={handleChangeOffers} error={errorMsg.old_price} />
          <TextInput type='number' label='New price' placeholder='Enter new price' id='new_price' value={newOffer.new_price}
            changeFunc={handleChangeOffers} error={errorMsg.new_price} />
          <TextInput type='date' label='Expire date' placeholder='Enter expire date' id='expire_date' value={newOffer.expire_date}
            changeFunc={handleChangeOffers} error={errorMsg.expire_date} />
          <TextInput type='text' label='Brief description' placeholder='Enter brief description' id='description' value={newOffer.description}
            changeFunc={handleChangeOffers} error={errorMsg.description} />
          <Selectspeciality specialityValue={newOffer} setSpecialityValue={setNewOffer} error={errorMsg} />
          <div className='w-full shrink-0 py-4 px-3 text-center border rounded-lg bg-white'>
            <input type='file' name='image' id='image' className='hidden' disabled />
            <label htmlFor='image' className='flex justify-center items-center border w-fit mx-auto py-2 px-4
          bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200'>
              <BiSolidCloudUpload className='text-2xl text-teal-color mr-3' />
              <p>Choose a offer photo</p>
            </label>
          </div>
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

export default CreateOffer