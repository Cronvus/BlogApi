import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Box, Chip, Paper, Typography } from '@mui/material'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowBackIos'
import { fetchSingleArticle } from '../../store/article'
import { ArticlePreview } from '../../components/ArticlePreview'
import { Spinner } from '../../components/Spinner'
import { ErrorMessage } from '../../components/ErrorMessage'
import { RootState, AppDispatch } from '../../store/store'

const SingleArticle = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { slug } = useParams()
  const navigate = useNavigate()

  const articleRequestStatus = useSelector((state: RootState) => state.articles.articleRequestStatus)
  const errorArticleServer = useSelector((state: RootState) => state.articles.errorArticleServer)

  useEffect(() => {
    if (slug != null) {
      dispatch(fetchSingleArticle(slug))
    }
  }, [dispatch, slug])

  const goBack = () => navigate(-1)

  const article = useSelector((state: RootState) => state.articles.singleArticle)

  return (
    <>
      {articleRequestStatus === 'rejected' && errorArticleServer && typeof errorArticleServer === 'object' && (
        <ErrorMessage serverError={errorArticleServer} />
      )}
      {articleRequestStatus === 'rejected' && errorArticleServer && typeof errorArticleServer === 'string' && (
        <ErrorMessage serverError={{ status: -1, statusText: errorArticleServer }} />
      )}
      {articleRequestStatus === 'pending' && <Spinner />}
      {articleRequestStatus === 'fulfilled' && article && (
        <>
          <Paper sx={{ p: '15px', mb: 2 }}>
            <ArticlePreview article={article} singlePage />
            <Box sx={{ p: 2 }}>
              <Typography component="span">
                <ReactMarkdown>{article.body}</ReactMarkdown>
              </Typography>
            </Box>
          </Paper>
          <Chip
            icon={<ArrowCircleLeftOutlinedIcon />}
            label="Go back"
            variant="outlined"
            onClick={goBack}
            sx={{ background: 'white' }}
          />
        </>
      )}
    </>
  )
}

export default SingleArticle