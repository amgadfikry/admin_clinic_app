import { useEffect } from 'react'
import { baseUrl } from '../../constant'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function AuthChecker() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

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
            navigate('/dashboard')
          } else {
            navigate('/signin')
          }
        })
    } else {
      navigate('/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default AuthChecker