import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { setUserFromLocalStorage } from '../../store/user'

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      dispatch(setUserFromLocalStorage(JSON.parse(user)))
    }
  }, [dispatch])  
  
    
  return (
    <>
      <Header/>
      <Main>
        <Outlet/>
      </Main>
    </>
  )
}

export default Layout