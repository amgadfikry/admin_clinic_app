/* eslint-disable no-unused-vars */
import {
  Routes, Route, ContentSpeciality, CreateSpeciality, EditSpeciality,
} from '../../import'

function Specialities() {
  
    return (
      <div className='pt-[100px] pl-[70px] pb-[100px] pr-[20px] min-h-screen'>
        <Routes>
          <Route exact path='/' element={<ContentSpeciality />} ></Route>
          <Route exact path='create' element={<CreateSpeciality />} ></Route>
          <Route exact path='edit/:name' element={<EditSpeciality />} ></Route>
        </Routes>
      </div>
    )

}

export default Specialities