import {
  Routes, Route, CreateDoctor, EditDoctor, ContentDoctor, Header, PreviewDoctor
} from '../../import'

function Doctors() {
  return (
    <div className='relative min-h-full'>
      <Header head="Doctors" />
      <Routes>
        <Route exact path='/' element={<ContentDoctor />} ></Route>
        <Route exact path='create' element={<CreateDoctor />} ></Route>
        <Route exact path='edit/:name' element={<EditDoctor />} ></Route>
        <Route exact path='preview/:name' element={<PreviewDoctor />} ></Route>
      </Routes>
    </div>
  )
}

export default Doctors