/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  useCookies, useNavigate, useState, useEffect, baseUrl, ServerError, LoadingComponent,
} from '../import.js'

function AuthChecker({ children }) {
  const [cookies, setCookie] = useCookies(['token']);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname
    if ('token' in cookies) {
      fetch(`${baseUrl}/api/public/state`, {
        headers: {
          'Authorization': 'Bearer ' + cookies.token,
        },
        method: 'GET',
        mode: 'cors',
      }).then(response => response.json())
        .then(data => {
          if (data.type === 'admin') {
            setLoading(false)
            navigate(path)
          } else {
            setLoading(false)
            navigate('/signin')
          }
        })
        .catch((error) => {
          setLoading(false)
          setServerError(true)
        });
    } else {
      setLoading(false)
      navigate('/signin')
    }
  }, [])

  if (serverError) {
    return <ServerError />
  } else if (loading) {
    return <LoadingComponent />
  } else {
    return children
  }
}

export default AuthChecker