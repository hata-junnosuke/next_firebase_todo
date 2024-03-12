import { User, onAuthStateChanged } from 'firebase/auth'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth } from '../../firebase'
import { useRouter } from 'next/navigation'

type AppProviderProps = {
  children: ReactNode
}

type AppContextType = {
  user: User | null
  userId: string | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  selectedGroup: string | null
  setSelectedGroup: React.Dispatch<React.SetStateAction<string | null>>
  selectGroupName: string | null
  setSelectGroupName: React.Dispatch<React.SetStateAction<string | null>>
}

const defalutContextData = {
  user: null,
  userId: null,
  setUser: () => {},
  selectedGroup: null,
  setSelectedGroup: () => {},
  selectGroupName: null,
  setSelectGroupName: () => {},
}

const AppContext = createContext<AppContextType>(defalutContextData)

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [selectGroupName, setSelectGroupName] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser)
      setUserId(newUser ? newUser.uid : null)

      if (!newUser) {
        router.push('/auth/login')
      }
    })

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        userId,
        setUser,
        selectedGroup,
        setSelectedGroup,
        selectGroupName,
        setSelectGroupName,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
