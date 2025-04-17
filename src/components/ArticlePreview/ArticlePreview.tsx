import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, Button, Checkbox, Chip, Grid, Typography } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { fetchDeleteArticle, fetchDeleteFavoriteArticle, fetchSetFavoriteArticle } from '../../store/article'
import { RootState, AppDispatch } from '../../store/store'
import { ModalWindow } from '../ModalWindow'
import formatDate from '../../utils/date'
import key from '../../utils/key'
import avatarPicture from '../../assets/images/defaultAvatar.svg'
import { ArticleProps } from '../type'

interface ArticlePreviewProps {
  article: ArticleProps;
  singlePage: boolean;
}


const ArticlePreview: React.FC<ArticlePreviewProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { article, singlePage } = props
  const userLoggedIn = useSelector((state: RootState) => state.user.username ?? '')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [checkFavorite, setCheckFavorite] = useState(article?.favorited || false)
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount)
  const userCreatorArticle = article.author.username
  const closeModal = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)

  const handleCheckboxClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLInputElement
    if (target.checked) {
      dispatch(fetchSetFavoriteArticle(article.slug))
      setCheckFavorite(true)
      setFavoriteCount(favoriteCount + 1)
    } else {
      dispatch(fetchDeleteFavoriteArticle(article.slug))
      setCheckFavorite(false)
      setFavoriteCount(favoriteCount - 1)
    }
  }

  const deleteArticle = () => {
    dispatch(fetchDeleteArticle(article.slug))
    setModalIsOpen(false)
    navigate('/articles', { replace: true })
  }

  return (
    <>
      <Grid container sx={{ p: 2 }}>
        <Grid size ={{ xs: 9 }} component='div'>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ mb: 1, gap: 1 }}>
            {!singlePage && (
              <Link to={`${article.slug}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h5" color="#1890FF">
                  {article.title}
                </Typography>
              </Link>
            )}
            {singlePage && (
              <Typography variant="h5" color="#1890FF">
                {article.title}
              </Typography>
            )}
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: 'red' }} />}
              disabled={!userLoggedIn}
              checked={checkFavorite}
              onClick={(event) => handleCheckboxClick(event)}
            />
            <Typography sx={{ mr: '5px' }}>{favoriteCount}</Typography>
          </Grid>
          {article.tagList.map(
            (tag: string) => tag && <Chip key={key()} label={tag} variant="outlined" size="small" sx={{ mr: 1 }} />,
          )}
          <Typography align="justify" sx={{ mt: 1 }}>
            {article.description}
          </Typography>
        </Grid>
        <Grid size ={{ xs:3 }} component='div'>
          <Grid container direction="row-reverse" sx={{ mb: 3 }}>
            <Avatar alt="Avatar" src={article.author.image || avatarPicture} sx={{ width: 46, height: 46 }} />
            <Box sx={{ mr: 1 }}>
              <Typography variant="h6" align="right">
                {article.author.username}
              </Typography>
              <Typography variant="body2" align="right" sx={{ color: '#808080' }}>
                {formatDate(article.createdAt)}
              </Typography>
            </Box>
          </Grid>

          {singlePage && userLoggedIn === userCreatorArticle && (
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button color="error" variant="outlined" sx={{ textTransform: 'none', mr: 3 }} onClick={openModal}>
                    Delete
              </Button>
              <Link to={`/articles/${article.slug}/edit`} style={{ textDecoration: 'none' }}>
                <Button color="success" variant="outlined" sx={{ textTransform: 'none' }} >
                      Edit
                </Button>
              </Link>
            </Box>
          )}
        </Grid>
      </Grid>
      <ModalWindow modalIsOpen={modalIsOpen} handleCloseModal={closeModal} handleClickDelete={deleteArticle} />
    </>
  )
}

export default ArticlePreview