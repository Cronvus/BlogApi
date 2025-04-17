import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import CookieUtils from '../utils/CookieUtils'
import { ArticleProps, ErrorResponse } from '../components/type'

export const fetchGetArticles = createAsyncThunk(
  'articles/fetchGetArticles',
  async ({ limit, offset }: { limit: number, offset: number }, { rejectWithValue }) =>
    axios
      .get('https://blog-platform.kata.academy/api/articles', {
        params: {
          limit,
          offset,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${CookieUtils.getCookie('token')}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({ status: err.response.status, statusText: err.response.statusText } as ErrorResponse)
      }),
)
export const fetchSingleArticle = createAsyncThunk('articles/fetchSingleArticle', async (slug: string, { rejectWithValue }) =>
  axios
    .get(`https://blog-platform.kata.academy/api/articles/${slug}`)
    .then((res) => res.data)
    .catch((err) => {
      return rejectWithValue({ status: err.response.status, statusText: err.response.statusText } as ErrorResponse)
    }),
)

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async ({ title, description, body, tagList }: { title: string, description: string, body: string, tagList: string[] }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://blog-platform.kata.academy/api/articles',
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${CookieUtils.getCookie('token')}`,
          },
        },
      )
      return res.data
    } catch (err) {
      // eslint-disable-next-line import/no-named-as-default-member
      if (axios.isAxiosError(err)) {
        return rejectWithValue({
          status: err.response?.status,
          statusText: err.response?.statusText,
        } as ErrorResponse)
      }
      return rejectWithValue({
        status: 500,
        statusText: 'Unknown error occurred',
      } as ErrorResponse)
    }
  },
)

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async ({ slug, title, description, body, tagList }:{ slug: string, title: string, description: string, body: string, tagList: string[] }, { rejectWithValue }) => {
    axios
      .put(
        `https://blog-platform.kata.academy/api/articles/${slug}`,
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${CookieUtils.getCookie('token')}`,
          },
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue(err.message)
      })
  },
)

export const fetchDeleteArticle = createAsyncThunk('articles/fetchDeleteArticle', async (slug: string, { rejectWithValue }) =>
  axios
    .delete(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${CookieUtils.getCookie('token')}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      return rejectWithValue({ status: err.response.status, statusText: err.response.statusText } as ErrorResponse)
    }),
)

export const fetchSetFavoriteArticle = createAsyncThunk(
  'articles/fetchSetFavoriteArticle',
  async (slug: string, { rejectWithValue }) =>
    axios
      .post(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${CookieUtils.getCookie('token')}`,
          },
        },
      )
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({ status: err.response.status, statusText: err.response.statusText } as ErrorResponse)
      }),
)

export const fetchDeleteFavoriteArticle = createAsyncThunk(
  'articles/fetchDeleteFavoriteArticle',
  async (slug: string, { rejectWithValue }) =>
    axios
      .delete(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${CookieUtils.getCookie('token')}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        return rejectWithValue({ status: err.response.status, statusText: err.response.statusText } as ErrorResponse)
      }),
)

interface ArticleState {
  articles: ArticleProps[],
  singleArticle: ArticleProps | null,
  articlesCount: number,
  articleRequestStatus: string | null,
  errorArticleServer: ErrorResponse | null,
  articleIsCreated: boolean
}
const initialState: ArticleState = {
  articles: [],
  singleArticle: null,
  articlesCount: 0,
  articleRequestStatus: '',
  errorArticleServer: null,
  articleIsCreated: false,
}

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
      .addCase(fetchGetArticles.pending, (state) => {
        state.articleRequestStatus = 'pending'
        state.errorArticleServer = null
        state.articleIsCreated = false
      })
      .addCase(fetchSingleArticle.pending, (state) => {
        state.articleRequestStatus = 'pending'
        state.errorArticleServer = null
        state.articleIsCreated = false
      })
      .addCase(fetchCreateArticle.pending, (state) => {
        state.articleRequestStatus = 'pending'
        state.errorArticleServer = null
        state.articleIsCreated = false
      })
      .addCase(fetchEditArticle.pending, (state) => {
        state.articleRequestStatus = 'pending'
        state.errorArticleServer = null
        state.articleIsCreated = false
      })
      .addCase(fetchDeleteArticle.pending, (state) => {
        state.articleRequestStatus = 'pending'
        state.errorArticleServer = null
      })
      .addCase(fetchSetFavoriteArticle.pending, () => {
        console.log('Отправка запроса на добавление в избранное')
      })
      .addCase(fetchDeleteFavoriteArticle.pending, () => {
        console.log('Отправка запроса на удаление из избранного')
      })
      .addCase(fetchGetArticles.fulfilled, (state, action) => {
        state.articles = [...action.payload.articles]
        state.articlesCount = action.payload.articlesCount
        state.articleRequestStatus = 'fulfilled'
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.singleArticle = { ...action.payload.article }
        state.articleRequestStatus = 'fulfilled'
      })

      .addCase(fetchCreateArticle.fulfilled, (state) => {
        state.articleRequestStatus = 'fulfilled'
        state.articleIsCreated = true
      })

      .addCase(fetchEditArticle.fulfilled, (state) => {
        state.articleRequestStatus = 'fulfilled'
        state.articleIsCreated = true
      })

      .addCase(fetchDeleteArticle.fulfilled, (state) => {
        state.articleRequestStatus = 'fulfilled'
      })
      .addCase(fetchSetFavoriteArticle.fulfilled, (state, action) => {
        console.log('Успешный запрос на добавление в избранное')
      })
      .addCase(fetchDeleteFavoriteArticle.fulfilled, (state, action) => {
        console.log('Успешный запрос на удаление из избранного')
      })
      .addCase(fetchGetArticles.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          state.errorArticleServer = error
        }
        state.articleRequestStatus = 'rejected'
      })
      .addCase(fetchSingleArticle.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          state.errorArticleServer = error
        }
        state.articleRequestStatus = 'rejected'
      })
      .addCase(fetchCreateArticle.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          state.errorArticleServer = error
        }
        state.articleRequestStatus = 'rejected'
      })
      .addCase(fetchEditArticle.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          state.errorArticleServer = error
        }
        state.articleRequestStatus = 'rejected'
      })

      .addCase(fetchDeleteArticle.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          state.errorArticleServer = error
        }
        state.articleRequestStatus = 'rejected'
      })
      .addCase(fetchSetFavoriteArticle.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          state.errorArticleServer = error
        }
        state.articleRequestStatus = 'rejected'
      })
      .addCase(fetchDeleteFavoriteArticle.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          state.errorArticleServer = error
        }
        state.articleRequestStatus = 'rejected'
      })
  },
})
// eslint-disable-next-line no-empty-pattern
export const {} = articleSlice.actions

export default articleSlice.reducer