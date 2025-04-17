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

const App = () => {

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