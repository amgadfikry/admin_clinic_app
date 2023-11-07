import {
  Routes, Route, ContentOffer, CreateOffer, EditOffer
} from '../../import'

function Offers() {
  return (
    <div className='pt-[100px] pl-[70px] pb-[100px] pr-[20px] min-h-screen'>
      <Routes>
        <Route exact path='/' element={<ContentOffer />} ></Route>
        <Route exact path='create' element={<CreateOffer />} ></Route>
        <Route exact path='edit/:name' element={<EditOffer />} ></Route>
      </Routes>
    </div>
  )
}

export default Offers