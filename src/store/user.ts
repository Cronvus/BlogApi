import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import CookieUtils from '../utils/CookieUtils'
import { ErrorResponse } from '../components/type'


export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    return axios
      .post(
        'https://blog-platform.kata.academy/api/users/login',
        {
          user: {
            email,
            password,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((res) => {
        console.log(res.data)
        return res.data
      })
      .catch((err) => {
        console.log('err.response', err.response)
        return rejectWithValue({
          status: err.response.status,
          statusText: err?.response?.data?.errors?.message || 'Логин или пароль не верные',
        })
      })
  },
)

export const fetchCreateUser = createAsyncThunk(
  'user/fetchCreateUser',
  async ({ username, email, password }:{ username: string, email: string, password: string }, { rejectWithValue }) => {
    return axios
      .post(
        'https://blog-platform.kata.academy/api/users',
        {
          user: {
            username,
            email,
            password,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then((res) => {
        console.log(res.data)
        return res.data
      })
      .catch((err) => {
        console.log(err.response.data)
        return rejectWithValue({
          status: err.response.status,
          statusText: err?.response?.data?.errors?.message || 'Не верные данные. Проверьте заполнение полей!',
        })
      })
  },
)

export const fetchUpdateUserProfile = createAsyncThunk(
  'user/fetchUpdateUserProfile',

  async ({ username, email, password, avatarUrl: image }:{ username: string, email: string, password: string, avatarUrl: string | null }, { rejectWithValue }) => {
    console.log('Incoming data', username, email, password, image)
    return axios
      .put(
        'https://blog-platform.kata.academy/api/user',
        {
          user: {
            username,
            email,
            password,
            image,
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
        return rejectWithValue({
          status: err.response.status,
          statusText:
                  err?.response?.data?.errors?.message || 'Данные не изменились. Такой пользователь уже существует!',
        })
      })
  },
)

interface UserState {
  username: string;
  email: string;
  bio: string;
  image: string;
  userRequestStatus: string | null;
  errorUserServer: string | null;
  userIsEdit: boolean;
}

const initialState: UserState = {
  username: '',
  email: '',
  bio: '',
  image: '',
  userRequestStatus: null,
  errorUserServer: null,
  userIsEdit: false,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state) {
      CookieUtils.deleteCookie('token')
      state.username = ''
      state.email = ''
      state.bio = ''
      state.image = ''
      state.userRequestStatus = null
      localStorage.removeItem('user')
    },
    setUserIsNotEdit(state) {
      state.userIsEdit = false
    },
    resetUserError(state) {
      state.errorUserServer = null
    },
    setUserFromLocalStorage(state, action) {
      const { username, email, bio, image } = action.payload
      state.username = username
      state.email = email
      state.bio = bio
      state.image = image
      state.userIsEdit = true
      state.userRequestStatus = 'fulfilled'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.userRequestStatus = 'pending'
        state.errorUserServer = null
        state.userIsEdit = false
      })
      .addCase(fetchCreateUser.pending, (state) => {
        state.userRequestStatus = 'pending'
        state.errorUserServer = null
        state.userIsEdit = false
      })
      .addCase(fetchUpdateUserProfile.pending, (state) => {
        state.userRequestStatus = 'pending'
        state.errorUserServer = null
        state.userIsEdit = false
      })

      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.userRequestStatus = 'fulfilled'
        state.username = action.payload.user.username
        state.email = action.payload.user.email
        state.bio = action.payload.user.bio
        state.image = action.payload.user.image
        document.cookie = `token = ${action.payload.user.token}`
        state.userIsEdit = true
      })
      .addCase(fetchCreateUser.fulfilled, (state) => {
        state.userRequestStatus = 'fulfilled'
        state.userIsEdit = true
      })
      .addCase(fetchUpdateUserProfile.fulfilled, (state) => {
        state.userRequestStatus = 'fulfilled'
        state.userIsEdit = true
      })

      .addCase(fetchLoginUser.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          console.log('User not logged in, error!!!', action.payload)
          state.errorUserServer = error.statusText
        }
        state.userRequestStatus = 'rejected'
      })

      .addCase(fetchCreateUser.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          console.log('User not created, error!!!', action.payload)
          state.errorUserServer = error.statusText
        }
        state.userRequestStatus = 'rejected'
        state.userIsEdit = false
      })

      .addCase(fetchUpdateUserProfile.rejected, (state, action) => {
        if (action.payload) {
          const error = action.payload as ErrorResponse
          console.log('User not updated, error!!!', action.payload)
          state.errorUserServer = error.statusText
        }
        state.userRequestStatus = 'rejected'
        state.userIsEdit = false
      })
  },
})

export const { logOut, setUserIsNotEdit, resetUserError, setUserFromLocalStorage } = user.actions

export default user.reducer