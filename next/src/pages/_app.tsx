import '@/styles/globals.css'
import { onAuthStateChanged } from 'firebase/auth'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { auth } from '../../firebase'
import useAuthStore from '@/stores/authStore'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合、Zustandストアを更新
        useAuthStore.getState().setUser(user)
      } else {
        // ユーザーがログアウトしている場合、Zustandストアを更新
        useAuthStore.getState().setUser(null)
        router.push('/auth/login')
      }
    })

    return () => unsubscribe()
    // [disable]新規登録画面への遷移を許可するため、routerを依存配列に追加しない.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Component {...pageProps} />
}
