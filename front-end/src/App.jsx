import Signin from "./pages/signin"
import Dashboard from "./pages/dashboard"
import AuthChecker from "./components/authChecker";
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Router>
          <Routes>
            <Route exact path='/' element={<AuthChecker />} ></Route>
            <Route exact path='/signin' element={<Signin />} ></Route>
            <Route exact path='/dashboard' element={<Dashboard />} ></Route>
          </Routes>
        </Router>
      </CookiesProvider>
    </>
  )
}

export default App
