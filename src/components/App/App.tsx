import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ArticleList } from '../../pages/ArticleList'
import { SignIn } from '../../pages/SignIn'
import { SignUp } from '../../pages/SignUp'
import { EditProfile } from '../../pages/EditProfile'
import { CreateArticle } from '../../pages/CreateArticle'
import { NotFound } from '../../pages/NotFound'
import { Layout } from '../Layout'
import { SingleArticle } from '../../pages/SingleArticle'
import { EditArticle } from '../../pages/EditArticle'
import RequireAuth from '../hooks/RequireAuth'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { fetchLoginUser } from '../../store/user'

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = localStorage.getItem('user')

  if (user) {
    const userData = JSON.parse(user)
    if (userData) {
      dispatch(fetchLoginUser({ email: userData.email, password: userData.password }))
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="articles" replace />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="articles/:slug" element={<SingleArticle />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path="new-article"
          element={
            <RequireAuth>
              <CreateArticle />
            </RequireAuth>
          }
        />
        <Route
          path="articles/:slug/edit"
          element={
            <RequireAuth>
              <EditArticle />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App