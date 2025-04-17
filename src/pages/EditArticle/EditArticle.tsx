import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchEditArticle, fetchSingleArticle, fetchDeleteArticle } from '../../store/article'
import { ArticleForm } from '../../components/ArticleForm'
import { ModalWindow } from '../../components/ModalWindow'
import { ErrorMessage } from '../../components/ErrorMessage'
import { Spinner } from '../../components/Spinner'
import { RootState, AppDispatch } from '../../store/store'

const EditArticle = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { slug } = useParams()
  const article = useSelector((state: RootState) => state.articles.singleArticle)

  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'
  const articleRequestStatus = useSelector((state: RootState) => state.articles.articleRequestStatus)
  const errorArticleServer = useSelector((state: RootState) => state.articles.errorArticleServer)
  const articleIsCreated = useSelector((state: RootState) => state.articles.articleIsCreated)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (slug != null) {
      dispatch(fetchSingleArticle(slug))
    }
  }, [dispatch, slug])

  useEffect(() => {
    if (articleIsCreated === true) {
      navigate(fromPage, { replace: true })
    }
  }, [navigate, fromPage, articleIsCreated])

  const handlerFormSubmit = ( { title, description, body } :{ title: string, description: string, body: string }, tagList: string[]) => {
    if (slug) {
      dispatch(fetchEditArticle({ slug, title, description, body, tagList }))
      navigate(fromPage, { replace: true })
    }
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  const handleClickDelete = () => {
    if (slug != null) {
      dispatch(fetchDeleteArticle(slug))
    }
    handleCloseModal()
    navigate('/articles', { replace: true })
  }

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
          <ArticleForm article={article} handlerFormSubmit={handlerFormSubmit} />
          <ModalWindow 
            modalIsOpen={modalIsOpen}
            handleCloseModal={handleCloseModal}
            handleClickDelete={handleClickDelete}
          />
        </>
      )}
    </>
  )
}

export default EditArticle