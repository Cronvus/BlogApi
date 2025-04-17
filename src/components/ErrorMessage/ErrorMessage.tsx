import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetUserError } from '../../store/user'
import { Alert, Snackbar } from '@mui/material'
import { ErrorResponse } from '../type'

const ErrorMessage = ({ serverError }: { serverError: ErrorResponse }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (serverError.status === 404) {
      dispatch(resetUserError())
      navigate('/notFound', { replace: true })
    }
  }, [navigate, serverError])
  const handleClose = () => {
    setOpen(false)
    dispatch(resetUserError())
  }
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
            Ошибка &quot;`{serverError.statusText}`&quot;
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ErrorMessage