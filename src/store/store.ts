import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './article'
import userReducer from './user'

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store