// src/stores/authStore.ts
import { Timestamp } from 'firebase/firestore'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Group = {
  id: string
  name: string
  createdAt: Timestamp
}

type GroupState = {
  selectedGroup: Group | null
  setSelectedGroup: (selectedGroup: Group | null) => void
}

const useGroupStore = create<GroupState>()(
  devtools(
    persist(
      (set) => ({
        selectedGroup: null,
        setSelectedGroup: (selectedGroup: Group | null) =>
          set({ selectedGroup }),
      }),
      {
        name: 'auth', // ストレージキーを auth-storage に設定
      },
    ),
  ),
)

export default useGroupStore
