import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

interface SignInFormProps {
  handleFormSubmit: (data: SignInFormData) => void;
}

interface SignInFormData {
  email: string;
  password: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ handleFormSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>({
    mode: 'onBlur',
  })

  const onSubmit = (data: SignInFormData) => {
    if (!data.email) {
      return alert('Поле "Email" должно быть заполнено')
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      return  alert('Email не верный')
    }
    if (!data.password || data.password.length < 6) {
      return alert('Поле "Password" должно содержать не менее 6 символов')
    }

    handleFormSubmit(data)
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
        <Paper sx={{ p: 5 }}>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{
              mb: 1,
            }}
          >
              Sign In
          </Typography>

          <Typography>Email address</Typography>

          <TextField
            id="email"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />

          <Typography>Password</Typography>
          <TextField
            type="password"
            id="password"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 3,
            }}
            {...register('password')}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mb: 2,
            }}
          >
              Login
          </Button>

          <Typography variant="body2" textAlign="center">
              Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
          </Typography>
        </Paper>
      </form>
    </Box>
  )
}

export default SignInForm