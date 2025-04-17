import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchUpdateUserProfile, setUserIsNotEdit } from '../../store/user'
import { UserForm } from '../../components/UserForm'
import { ErrorMessage } from '../../components/ErrorMessage'
import { RootState, AppDispatch } from '../../store/store'
import { UserFormData } from '../../components/type'

const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector((state: RootState) => state.user)
  const userRequestStatus = useSelector((state: RootState) => state.user.userRequestStatus)
  const errorUserServer = useSelector((state: RootState) => state.user.errorUserServer)
  const userIsEdit = useSelector((state: RootState) => state.user.userIsEdit)

  const fromPage = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (userRequestStatus === 'fulfilled' && userIsEdit) {
      dispatch(setUserIsNotEdit())
      navigate(fromPage, { replace: true })
    }
  }, [navigate, fromPage, userRequestStatus, userIsEdit, dispatch])

  const handlerFormSubmit = (data: UserFormData) => {
    dispatch(fetchUpdateUserProfile(data))
  }

  return (
    <>
      {errorUserServer && typeof errorUserServer === 'object' && (
        <ErrorMessage serverError={errorUserServer} />
      )}
      {errorUserServer && typeof errorUserServer === 'string' && (
        <ErrorMessage serverError={{ status: -1, statusText: errorUserServer }} />
      )}
      <UserForm user={user} handlerFormSubmit={handlerFormSubmit} />
    </>
  )
}

export default EditProfile