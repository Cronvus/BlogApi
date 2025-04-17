import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'

import key from '../../utils/key'

interface Article {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

interface ArticleFormProps {
  article?: Article;
  handlerFormSubmit: (data: Article, tagList: string[]) => void;
}

interface FormData {
  title: string;
  description: string;
  body: string;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, handlerFormSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      body: article?.body || '',
    },
    mode: 'onBlur',
  })

  const [tagList, setTagList] = useState<string[]>(article?.tagList || [])
  const [tagValue, setTagValue] = useState('')

  const validateForm = (data: FormData): boolean => {
    const { title, description, body } = data
    if (!title) {
      alert('Поле "Title" должно быть заполнено')
      return false
    }
    if (!description) {
      alert('Поле "Short description" должно быть заполнено')
      return false
    }
    if (!body) {
      alert('Поле "Text" должно быть заполнено')
      return false
    }
    return true
  }

  const onSubmit = (data: FormData) => {
    if (validateForm(data)) {
      handlerFormSubmit({ ...data }, tagList)
    }
  }

  const handleClickAddTag = () => {
    if (tagValue && !tagList.includes(tagValue)) {
      setTagList([...tagList, tagValue])
      setTagValue('')
    }
  }

  const handleClickDeleteTag = (id: number) => {
    setTagList(tagList.filter((_, index) => index !== id))
  }


  return (
    <Container
      sx={{
        m: 'auto',
        maxWidth: '1440px',
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
              Create new article
          </Typography>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            required
            sx={{
              mb: 1,
            }}
            {...register('title')}
            error={!!errors?.title}
            helperText={errors?.title?.message}
          />
          <TextField
            id="description"
            label="Short description"
            variant="outlined"
            size="small"
            fullWidth
            required
            sx={{
              mb: 1,
            }}
            {...register('description')}
            error={!!errors?.description}
            helperText={errors?.description?.message}
          />
          <TextField
            id="body"
            label="body"
            variant="outlined"
            minRows={6}
            multiline
            fullWidth
            required
            sx={{
              mb: 1,
            }}
            {...register('body')}
            error={!!errors?.body}
            helperText={errors?.body?.message}
          />
          <Typography>Tags</Typography>
          {tagList &&
                tagList.map((item, id) => (
                  <Box key={key()} sx={{ mb: 2 }}>
                    <TextField disabled id={item} value={item} size="small" sx={{ mr: 2 }} />

                    <Button
                      variant="outlined"
                      color="error"
                      sx={{
                        textTransform: 'none',
                      }}
                      onClick={() => handleClickDeleteTag(id)}
                    >
                        Delete
                    </Button>
                  </Box>
                ))}
          <TextField
            id="tag"
            value={tagValue}
            variant="outlined"
            size="small"
            sx={{
              mr: 1,
            }}
            onChange={(event) => {
              setTagValue(event.target.value)
            }}
          />

          <Button
            variant="outlined"
            sx={{
              mb: 2,
              textTransform: 'none',
            }}
            onClick={handleClickAddTag}
          >
              Add Tag
          </Button>
          <Divider sx={{ mb: 2 }} />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mb: 2,
              textTransform: 'none',
              width: '50%',
            }}
          >
              Send
          </Button>
        </Paper>
      </form>
    </Container>
  )
}

export default ArticleForm