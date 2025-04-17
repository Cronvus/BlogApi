import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Box, Button, Checkbox, Divider, FormControlLabel, Paper, TextField, Typography } from '@mui/material'

interface UserFormProps {
  signUp?: boolean;
  user?: {
    username?: string;
    email?: string;
    image?: string;
  };
  handlerFormSubmit: (data: FormData) => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptPersonalInf?: boolean;
  avatarUrl: string;
}

const UserForm: React.FC<UserFormProps> = ({ signUp, user, handlerFormSubmit }) => {
  const formTitle = signUp ? 'Create new account' : 'Edit profile'
  const buttonLabel = signUp ? 'Create' : 'Save'

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      avatarUrl: user?.image || '',
    },
    mode: 'onBlur',
  })


  const validateFormData = (data: FormData) => {
    const validationErrors: Partial<Record<keyof FormData, string>> = {}
    let isValid = true

    if (!data.username) {
      isValid = false
      validationErrors.username = 'Поле "Имя пользователя" должно быть заполнено'
      alert(validationErrors.username)
    } else if (data.username.length < 3) {
      isValid = false
      validationErrors.username = 'Имя пользователя не должно содержать менее 3 символов'
      alert(validationErrors.username)
    } else if (data.username.length > 20) {
      isValid = false
      validationErrors.username = 'Имя пользователя не должно содержать более 20 символов'
      alert(validationErrors.username)
    }

    if (!data.email) {
      isValid = false
      validationErrors.email = 'Поле "Email" должно быть заполнено'
      alert(validationErrors.email)
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      isValid = false
      validationErrors.email = 'Email не верный'
      alert(validationErrors.email)
    }

    if (!data.password) {
      isValid = false
      validationErrors.password = 'Поле "Password" должно быть заполнено'
      alert(validationErrors.password)
    } else if (data.password.length < 6) {
      isValid = false
      validationErrors.password = 'Поле "Password" не должно содержать менее 6 символов'
      alert(validationErrors.password)
    }

    if (!data.confirmPassword) {
      isValid = false
      validationErrors.confirmPassword = 'Поле "Confirm Password" должно быть заполнено'
      alert(validationErrors.confirmPassword)
    } else if (data.confirmPassword !== data.password) {
      isValid = false
      validationErrors.confirmPassword = 'Пароли должны совпадать'
      alert(validationErrors.confirmPassword)
    }

    if (signUp && !data.acceptPersonalInf) {
      isValid = false
      validationErrors.acceptPersonalInf = 'Предоставьте согласие на обработку персональных данных'
      alert(validationErrors.acceptPersonalInf)
    }

    if (!signUp && data.avatarUrl && !/^https?:\/\/.+\..+/.test(data.avatarUrl)) {
      isValid = false
      validationErrors.avatarUrl = 'Введите корректный URL'
      alert(validationErrors.avatarUrl)
    }

    return { isValid, errors: validationErrors }
  }

  const onSubmit = (data: FormData) => {
    const validations = validateFormData(data)
    if (validations.isValid) {
      handlerFormSubmit({ ...data })
      console.log({ ...data })
    } else {
      console.log(validations.errors)
    }
  }

  return (
    <Box
      sx={{
        m: 'auto',
        mt: 10,
        maxWidth: 384,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            p: 5,
          }}
        >
          <Typography
            variant="h6"
            textAlign="center"
            sx={{
              mb: 1,
            }}
          >
            {formTitle}
          </Typography>

          <TextField
            id="username"
            label="User name"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('username')}
            error={!!errors?.username}
            helperText={errors?.username?.message}
          />

          <TextField
            id="email"
            type="email"
            variant="outlined"
            label="Email address"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />

          <TextField
            id="password"
            label={signUp ? 'Password' : 'New password'}
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('password')}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />

          <TextField
            id="confirmPassword"
            label="Repeat password"
            type="password"
            size="small"
            fullWidth
            sx={{
              mb: 2,
            }}
            {...register('confirmPassword')}
            error={!!errors?.confirmPassword}
            helperText={errors?.confirmPassword?.message}
          />

          {!signUp && (
            <TextField
              id="avatarUrl"
              type="url"
              label="Avatar image (url)"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 2,
              }}
              {...register('avatarUrl')}
              error={!!errors?.avatarUrl}
              helperText={errors?.avatarUrl?.message}
            />
          )}
          {signUp && (
            <>
              <Divider
                sx={{
                  mb: 1,
                }}
              />

              <FormControlLabel
                control={<Checkbox {...register('acceptPersonalInf')} />}
                label="I agree to the processing of my personal
information"
              />
              {!!errors?.acceptPersonalInf && (
                <Typography variant="caption" display="block" gutterBottom sx={{ color: 'red' }}>
                  {errors?.acceptPersonalInf?.message}
                </Typography>
              )}
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              my: 2,
            }}
          >
            {buttonLabel}
          </Button>

          {signUp && (
            <Typography variant="body2" textAlign="center">
                            Already have an account? <Link to="/sign-in">Sign In.</Link>
            </Typography>
          )}
        </Paper>
      </form>
    </Box>
  )
}

export default UserForm