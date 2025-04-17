import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCreateArticle } from '../../store/article'
import { ArticleForm } from '../../components/ArticleForm'
import { AppDispatch } from '../../store/store'

interface Article {
  title: string;
  description: string;
  body: string;
}

const CreateArticle: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handlerFormSubmit = (
    { title, description, body }: Article,
    tagList: string[] = [],
  ) => {
    dispatch(fetchCreateArticle({ title, description, body, tagList }))
    navigate('/articles', { replace: true })
  }
  
  return <ArticleForm handlerFormSubmit={handlerFormSubmit} />
}

export default CreateArticle