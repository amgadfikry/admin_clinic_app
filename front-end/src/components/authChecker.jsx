/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { baseUrl } from '../../constant'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import LoadingComponent from './loading';


function AuthChecker({ children }) {
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            navigate('/')
          } else {
            setLoading(false)
            navigate('/signin')
          }
        })
    } else {
      setLoading(false)
      navigate('/signin')
    }
  }, [cookies, navigate])
  if (loading) {
    return <LoadingComponent />
  }
  return children
}

export default AuthChecker