/* eslint-disable no-unused-vars */

import {
  Routes, Route, ContentSpeciality, CreateSpeciality, EditSpeciality
} from '../../import'


function Specialities() {
  return (
    <Routes>
      <Route exact path='/' element={<ContentSpeciality />} ></Route>
      <Route exact path='create' element={<CreateSpeciality />} ></Route>
      <Route exact path='edit/:id' element={<EditSpeciality />} ></Route>
    </Routes>
  )


}

export default Specialities