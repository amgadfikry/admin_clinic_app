/* eslint-disable no-unused-vars */
import {
  Link, useState, TextInput, SubmitBtn, baseUrl, useCookies, Selectspeciality, BiSolidCloudUpload,
  useEffect, checkDataError
} from '../../import'

function CreateOffer() {
  const emptyOffer = {'title': '', 'old_price': '', 'new_price': '', 'description': '',
  'expire_date': '', 'speciality_id': ''}
  const [newOffer, setNewOffer] = useState({...emptyOffer})
  const [errorMsg, setErrorMsg] = useState({})
  const [successChanges, setSuccessChanges] = useState(false)
  const [speciality, setSpeciality] = useState('')
  const [cookies] = useCookies(['token'])

  const handleChangeOffers = (e) => {
    e.preventDefault()
    setNewOffer({...newOffer, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setNewOffer({...emptyOffer})
    setSpeciality("")
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({});
    const errors = checkDataError(newOffer, [])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({...errors})
      return;
    }
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
        setSuccessChanges(true)
        setErrorMsg({});
        setNewOffer({...emptyOffer})
        setSpeciality("")
        setTimeout(() => {
          setSuccessChanges(false)
        }, 2000)
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
          <Selectspeciality specialityValue={newOffer} setSpecialityValue={setNewOffer} error={errorMsg} 
            speciality={speciality} setSpeciality={setSpeciality}/>
          <div className='w-full shrink-0 py-4 px-3 text-center border rounded-lg bg-white'>
            <input type='file' name='image' id='image' className='hidden' disabled />
            <label htmlFor='image' className='flex justify-center items-center border w-fit mx-auto py-2 px-4
          bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200'>
              <BiSolidCloudUpload className='text-2xl text-teal-color mr-3' />
              <p>Choose a offer photo</p>
            </label>
          </div>
          <SubmitBtn value='Create' error={errorMsg.all} cancel={handleCancel} success={successChanges}
            successMsg='Created successfully'/>
        </fieldset>
      </form>
    </section>
  )
}

export default CreateOffer