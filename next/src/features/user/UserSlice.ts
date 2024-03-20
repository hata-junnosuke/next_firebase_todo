import { createSlice } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

type UserType = {
  user: User | null
  userId: string | null
}

const initialState: UserType = {
  user: null,
  userId: 'userId',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, { payload }) {
      console.log('payload', payload)
      state.user = payload
    },
    logout(state) {
      state.user = null
    },
  },
})

const { login, logout } = userSlice.actions
export { login, logout }
export default userSlice.reducer
