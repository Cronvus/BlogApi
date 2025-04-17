import React from 'react'
import { CircularProgress, Stack } from '@mui/material'

const Spinner = () => (
  <Stack alignItems="center" sx={{ display: 'flex' }}>
    <CircularProgress />
  </Stack>
)

export default Spinner