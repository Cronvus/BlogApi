import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'

const Layout = () => (
  <>
    <Header />
    <Main>
      <Outlet />
    </Main>
  </>
)

export default Layout