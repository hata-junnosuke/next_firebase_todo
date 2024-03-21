// src/stores/authStore.ts
import { create } from 'zustand'
import { User } from 'firebase/auth'
import { devtools, persist } from 'zustand/middleware'

type AuthState = {
  user: User | null // ユーザー情報の型を User | null に設定
  setUser: (user: User | null) => void // setUser アクションの型を定義
  logout: () => void // logout アクションの型を定義
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: User | null) => set({ user }),
        logout: () => set({ user: null }),
      }),
      {
        name: 'auth', // ストレージキーを auth-storage に設定
      },
    ),
  ),
)

export default useAuthStore
