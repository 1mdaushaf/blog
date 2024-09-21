import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const Navigate = useNavigate()
    const [loader, setloader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            Navigate('/login')
        }else if (!authentication && authStatus !== authentication) {
             Navigate('/')
        }
        setloader(false)
    },[authStatus, Navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

