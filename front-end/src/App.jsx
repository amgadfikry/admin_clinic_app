import {
  Router, Routes, Route, CookiesProvider, AuthChecker, Signin, Dashboard
} from './import'


function App() {

  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Router>
          <Routes>
            <Route exact path='/signin' element={<AuthChecker> <Signin /> </AuthChecker>} ></Route>
            <Route exact path='/*' element={<AuthChecker> <Dashboard /> </AuthChecker>} ></Route>
          </Routes>
        </Router>
      </CookiesProvider>
    </>
  )
}

export default App
