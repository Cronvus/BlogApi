import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Paper, Stack } from '@mui/material'
import { fetchGetArticles } from '../../store/article'
import { ArticlePreview } from '../../components/ArticlePreview'
import { Spinner } from '../../components/Spinner'
import { ErrorMessage } from '../../components/ErrorMessage'
import { RootState, AppDispatch } from '../../store/store'

const ArticleList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [offset, setOffset] = useState(0)
  const articles = useSelector((state: RootState) => state.articles.articles)
  const articlesCount = useSelector((state: RootState) => state.articles.articlesCount)
  const articleRequestStatus = useSelector((state: RootState) => state.articles.articleRequestStatus)
  const errorArticleServer = useSelector((state: RootState) => state.articles.errorArticleServer)

  useEffect(() => {
    dispatch(fetchGetArticles({ limit: 5, offset }))
  }, [dispatch, offset])

  return (
    <>
      {articleRequestStatus === 'rejected' && errorArticleServer && typeof errorArticleServer === 'object' && (
        <ErrorMessage serverError={errorArticleServer} />
      )}
      {articleRequestStatus === 'rejected' && errorArticleServer && typeof errorArticleServer === 'string' && (
        <ErrorMessage serverError={{ status: -1, statusText: errorArticleServer }} />
      )}
      {articleRequestStatus === 'pending' && <Spinner />}
      {articleRequestStatus === 'fulfilled' && (
        <Stack spacing={2}>
          {articles.map((article) => (
            <Paper key={article.slug} sx={{ p: 1 }}>
              <ArticlePreview article={article} singlePage/>
            </Paper>
          ))}
        </Stack>
      )}
      {articleRequestStatus === 'fulfilled' && (
        <Stack alignItems="center" sx={{ mt: 2 }}>
          <Pagination
            count={Math.ceil(articlesCount / 5)}
            page={offset / 5 + 1}
            shape="rounded"
            onChange={(_, num) => {
              setOffset((num - 1) * 5)
            }}
          />
        </Stack>
      )}
    </>
  )
}

export default ArticleList