import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication=true}) {
    const authStatus = useSelector((state)=>state.auth.login)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
      if (authentication && authStatus !== authentication) {
        navigate('/login')
      }
      else if (!authentication && authStatus !== authentication) {
        navigate('/')
      }
      setLoader(false)
    }, [authentication, authStatus, navigate])
    

  return(
    loader ? <h2>Loading.....</h2>: <>{children}</>
  )
}
