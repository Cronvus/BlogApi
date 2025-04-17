import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchCreateUser, setUserIsNotEdit } from '../../store/user'
import { UserForm } from '../../components/UserForm'
import { ErrorMessage } from '../../components/ErrorMessage'
import { RootState, AppDispatch } from '../../store/store'
import { SignUpFormData } from '../../components/type'

const SignUp = () => {
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

  const handlerFormSubmit = (data: SignUpFormData) => {
    dispatch(fetchCreateUser(data))
    console.log(data)
  }

  return (
    <>
      {errorUserServer && typeof errorUserServer === 'object' && (
        <ErrorMessage serverError={errorUserServer} />
      )}
      {errorUserServer && typeof errorUserServer === 'string' && (
        <ErrorMessage serverError={{ status: -1, statusText: errorUserServer }} />
      )}
      <UserForm signUp handlerFormSubmit={handlerFormSubmit} />;
    </>
  )
}

export default SignUp