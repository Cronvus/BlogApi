import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import { logOut } from '../../store/user'
import avatarPicture from '../../assets/images/defaultAvatar.svg'
import { RootState } from '../../store/store'


const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userName = useSelector((state: RootState) => state.user.username) || 'Jon Doe'
  const auth = useSelector((state: RootState) => state.user.email)
  const userAvatar = useSelector((state: RootState) => state.user.image) || avatarPicture

  const fromPage = location.state?.from?.pathname || '/'

  const handleLogOutClick = () => {
    dispatch(logOut())
    navigate(fromPage, { replace: true })
  }
  const handelNavigateSignIn = () => {
    navigate('/sign-in', { replace: true })
  }

  const handelNavigateSignUp = () => {
    navigate('/sign-up', { replace: true })
  }
  const handelNewArticle = () => {
    navigate('/new-article', { replace: true })
  }

  return (
    <AppBar position="fixed" color="inherit" sx={{ boxShadow: 'unset' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Link style={{ textDecoration: 'none', flexGrow: 1 }} to="/articles">
          <Typography color="black" variant="h6" component="div">
                        Realworld Blog
          </Typography>
        </Link>
        {!auth && (
          <>
            
            <Button sx={{ textTransform: 'none', color: 'black' }} onClick={handelNavigateSignIn}>
              Sign In
            </Button>
            

            
            <Button color="success" variant="outlined" sx={{ textTransform: 'none' }} onClick={handelNavigateSignUp}>
                                Sign Up
            </Button>
            
          </>
        )}
        {auth && (
          <>
            
            <Button color="success" variant="outlined" sx={{ textTransform: 'none' }} onClick={handelNewArticle}>
                                Create article
            </Button>
           
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" color="black">
                {userName}
              </Typography>
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Avatar alt="Avatar" src={userAvatar} sx={{ width: 46, height: 46 }} />
            </Link>
            <Button color="inherit" variant="outlined" sx={{ textTransform: 'none' }} onClick={handleLogOutClick}>
                            Log Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header