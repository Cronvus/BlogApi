import React, { ReactNode } from 'react'
import { Container } from '@mui/material'

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => <Container sx={{ mt: '100px' }}>{children}</Container>

export default Main