import { useEffect, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { auth, db } from '../../firebase'
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import useStore from '../stores/useStore'
import useAuthStore from '../stores/authStore'
import useGroupStore from '../stores/groupStore'

type Group = {
  id: string
  name: string
  createdAt: Timestamp
}

const Sidebar = () => {
  const userState = useStore(useAuthStore, (state) => state.user)
  const user = userState ? userState : null // userがnullまたはundefinedの場合、nullを代入
  const [groups, setGroups] = useState<Group[]>([])

  const handleLogout = () => {
    auth.signOut()
  }

  const selectGroup = (group: Group) => {
    useGroupStore.getState().setSelectedGroup(group)
  }

  useEffect(() => {
    const fetchGroups = async () => {
      const groupCollectionRef = collection(db, 'groups')
      const q = query(groupCollectionRef, orderBy('createdAt'))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newGroups: Group[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          createdAt: doc.data().createdAt,
        }))
        setGroups(newGroups)
      })
      // クリーンアップ関数を返すことで、コンポーネントがアンマウントされたときにunsubscribeする
      return () => {
        unsubscribe()
      }
    }
    fetchGroups()
  }, [])

  const addNewRoom = async () => {
    const groupName = prompt('グループ名を入力してください。')
    await addDoc(collection(db, 'groups'), {
      name: groupName,
      userId: user?.uid,
      createdAt: Timestamp.now(),
    })
  }

  return (
    <div className="bg-pink-600 text-white h-full overflow-y-auto px-5 flex flex-col">
      <div className="flex-grow">
        <div
          onClick={addNewRoom}
          className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150"
        >
          <span className="text-white p-4 text-2xl">＋</span>
          <h1 className="text-white text-xl font-semibold p-4">New Group</h1>
        </div>
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150 "
              onClick={() => selectGroup(group)}
            >
              {group.name}
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <div className="mb-2 p-4 text-slate-100 text-lg font-medium">
          {user.email}
        </div>
      )}
      <div
        onClick={() => handleLogout()}
        className="text-lg flex items-center justify-evenly mb-2 cursor-pointer border p-4 text-slate-100 hover:bg-blue-800 duration-150"
      >
        <BiLogOut />
        <span>ログアウト</span>
      </div>
    </div>
  )
}

export default Sidebar
