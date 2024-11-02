import React from 'react'
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const Auth = () => {
    const cookie = new Cookies()
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        if(cookie.get('lgrole') != 'ADMIN'){
            navigate('/login')
        }
    },[location.pathname])
  return (
    <div>
      
    </div>
  )
}

export default Auth
