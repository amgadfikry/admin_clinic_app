import {
  Routes, Route, CreateDoctor, EditDoctor, ContentDoctor
} from '../../import'

function Doctors() {
  return (
    <div className='pt-[100px] pl-[70px] pb-[50px] pr-[20px] min-h-screen'>
      <Routes>
        <Route exact path='/' element={<ContentDoctor />} ></Route>
        <Route exact path='create' element={<CreateDoctor />} ></Route>
        <Route exact path='edit/:name' element={<EditDoctor />} ></Route>
      </Routes>
    </div>
  )
}

export default Doctors