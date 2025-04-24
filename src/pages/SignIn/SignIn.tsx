import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoginUser, setUserIsNotEdit } from '../../store/user'
import { SignInForm } from '../../components/SignInForm'
import { ErrorMessage } from '../../components/ErrorMessage'
import { RootState, AppDispatch } from '../../store/store'
import { SignInFormData } from '../../components/type'

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const userRequestStatus = useSelector((state: RootState) => state.user.userRequestStatus)
  const errorUserServer = useSelector((state: RootState) => state.user.errorUserServer)
  const userIsEdit = useSelector((state: RootState) => state.user.userIsEdit)
  const fromPage = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userIsEdit) {
      navigate(fromPage, { replace: true })
      dispatch(setUserIsNotEdit())

    }
  }, [dispatch, navigate, fromPage, userRequestStatus, userIsEdit])

  const handleFormSubmit = (data: SignInFormData) => {
    dispatch(fetchLoginUser({ email: data.email, password: data.password }))

  }
  return (
    <>
      {errorUserServer && typeof errorUserServer === 'object' && (
        <ErrorMessage serverError={errorUserServer} />
      )}
      {errorUserServer && typeof errorUserServer === 'string' && (
        <ErrorMessage serverError={{ status: -1, statusText: errorUserServer }} />
      )}
      <SignInForm handleFormSubmit={handleFormSubmit} />;
    </>
  )
}

export default SignIn