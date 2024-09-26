import React,{ useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authServices from './appwrite/auth'
import { login , logout} from './store/authSlice'
import { Footer, Header } from './component'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authServices.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({userData}))
        
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setloading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-black-200'>
      <div className='w-full'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
