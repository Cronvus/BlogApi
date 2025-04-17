import { useLocation, Navigate } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

interface RequireAuthProps {
  children: ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation()
  const auth = useSelector((state: RootState) => state.user.email)
  if (!auth) {
    return <Navigate to="/sign-in" state={{ from: location }} />
  }
  return <>{children}</>
}

export default RequireAuth