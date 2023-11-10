/* eslint-disable no-unused-vars */
import {
  useState, useCookies, Link, baseUrl, SubmitBtn, TextInput, useNavigate,
  useLocation, checkDataError, samilarData, Selectspeciality, BiSolidCloudUpload
} from '../../import'

function EditOffer() {
  const location = useLocation()
  const offersData = location.state
  const specialityName = offersData.speciality.name.slice()
  const [changeOffer, setChangeOffer] = useState({ ...offersData })
  const [speciality, setSpeciality] = useState(specialityName)
  const [errorMsg, setErrorMsg] = useState({})
  const [serverError, setServerError] = useState(false)
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangeOffers = (e) => {
    setChangeOffer({ ...changeOffer, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setChangeOffer({ ...offersData })
    setSpeciality(specialityName)
    setErrorMsg({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg({});
    const errors = checkDataError(changeOffer, ['image'])
    if (Object.keys(errors).length > 0) {
      setErrorMsg({ ...errors })
      return;
    }
    const errorSame = samilarData(changeOffer, offersData)
    if (Object.keys(errorSame).length > 0) {
      setErrorMsg({ ...errorSame })
      return;
    }
    fetch(`${baseUrl}/api/admin/offer/${offersData.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changeOffer),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setErrorMsg({});
        setChangeOffer({ ...data })
        navigate('/dashboard/offers')
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }

  return (
    <section className="">
      <header className="flex justify-between items-center pb-3 border-b mb-8">
        <h1 className="text-3xl text-teal-color font-bold">Edit {offersData.title}</h1>
        <Link to='/dashboard/offers'>
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Back</button>
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Offer Info</legend>
          <TextInput type='text' label='Offer title' placeholder='Enter offer title' id='title' value={changeOffer.title}
            changeFunc={handleChangeOffers} error={errorMsg.title} />
          <TextInput type='number' label='Old price' placeholder='Enter old price' id='old_price' value={changeOffer.old_price}
            changeFunc={handleChangeOffers} error={errorMsg.old_price} />
          <TextInput type='number' label='New price' placeholder='Enter new price' id='new_price' value={changeOffer.new_price}
            changeFunc={handleChangeOffers} error={errorMsg.new_price} />
          <TextInput type='date' label='Expire date' placeholder='Enter expire date' id='expire_date' value={changeOffer.expire_date}
            changeFunc={handleChangeOffers} error={errorMsg.expire_date} />
          <TextInput type='text' label='Brief description' placeholder='Enter brief description' id='description' value={changeOffer.description}
            changeFunc={handleChangeOffers} error={errorMsg.description} />
          <Selectspeciality specialityValue={changeOffer} setSpecialityValue={setChangeOffer} error={errorMsg}
            speciality={speciality} setSpeciality={setSpeciality} setSpecialityPrice='' />
          <div className='w-full shrink-0 py-4 px-3 text-center border rounded-lg bg-white'>
            <input type='file' name='image' id='image' className='hidden' disabled />
            <label htmlFor='image' className='flex justify-center items-center border w-fit mx-auto py-2 px-4
          bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200'>
              <BiSolidCloudUpload className='text-2xl text-teal-color mr-3' />
              <p>Choose a offer photo</p>
            </label>
          </div>
          <SubmitBtn value='Update' error={errorMsg.all} cancel={handleCancel} success={false}
            successMsg='' />
        </fieldset>
      </form>
    </section>
  )
}

export default EditOffer