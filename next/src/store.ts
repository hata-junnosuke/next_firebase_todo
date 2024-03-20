import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './features/user/UserSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({ user: userReducer })
const persistConfig = {
  key: 'root', // Storageに保存されるキー名を指定する
  storage, // 保存先としてlocalStorageがここで設定される
}
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
})
