/**
 * v0 by Vercel.
 * @see https://v0.dev/t/J0ok6YkwQGe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { db } from '../../firebase'
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { FaTrashAlt } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import useStore from '@/stores/useStore'
import useGroupStore from '@/stores/groupStore'
import useAuthStore from '@/stores/authStore'

type Todo = {
  id: string
  content: string
  deadline: Timestamp
  completed: boolean
  createdAt: Timestamp
  userId: string
}

type Inputs = {
  content: string
  deadline: Timestamp
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const selectedGroup = useStore(useGroupStore, (state) => state.selectedGroup)
  const user = useStore(useAuthStore, (state) => state.user)

  useEffect(() => {
    const fetchTodos = async () => {
      if (user && selectedGroup) {
        // 'groups'コレクション内の特定のドキュメントIDを持つドキュメント参照を取得
        const groupDocRef = doc(db, 'groups', selectedGroup.id)
        // 上記のドキュメント参照を使用して、'todos'サブコレクションへの参照を作成
        const todoCollectionRef = collection(groupDocRef, 'todos')
        const q = query(todoCollectionRef, orderBy('deadline'))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newTodos: Todo[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            content: doc.data().content,
            deadline: doc.data().deadline,
            completed: doc.data().completed || false, // completedがundefinedの場合に備えてfalseをデフォルト値として設定
            createdAt: doc.data().createdAt,
            userId: user.uid, // userがnullまたはundefinedの場合に備えて空文字をデフォルト値として設定
          }))
          setTodos(newTodos)
        })
        // クリーンアップ関数を返すことで、コンポーネントがアンマウントされたときにunsubscribeする
        return () => {
          unsubscribe()
        }
      }
    }
    fetchTodos()
  }, [user, selectedGroup])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>()

  const onSubmit = async (data: Inputs) => {
    if (!user || !selectedGroup) return

    await addDoc(collection(db, 'groups', selectedGroup.id, 'todos'), {
      content: data.content,
      //@ts-expect-error - converting string to Timestamp
      deadline: Timestamp.fromDate(new Date(data.deadline)),
      completed: false,
      createdAt: serverTimestamp(),
      userId: user.uid,
    })
    reset()
  }

  const handleToggle = async (id: string, completed: boolean) => {
    if (!selectedGroup) return // グループが選択されていない場合は何もしない
    const todoDocRef = doc(db, 'groups', selectedGroup.id, 'todos', id)
    await updateDoc(todoDocRef, {
      completed: !completed,
    })
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('このタスクを削除してよろしいですか？')
    if (!confirmDelete) return
    try {
      //@ts-expect-error - converting string to Timestamp
      await deleteDoc(doc(db, 'groups', selectedGroup.id, 'todos', id))
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Error removing document: ', error)
    }
  }

  return (
    <div>
      <h1 className="text-xl lg:text-2xl font-bold tracking-tight">
        ToDoリスト
      </h1>
      <div className="bg-blue-100 rounded-lg dark:bg-blue-800 my-4">
        <ul className="divide-y divide-blue-200 dark:divide-blue-800">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center p-4 space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={todo.id}
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id, todo.completed)}
                />
                <p
                  className={`leading-none ${
                    todo.completed ? 'line-through' : ''
                  }`}
                >
                  {todo.content} 期限:
                  {todo.deadline.toDate().toLocaleDateString()}
                </p>
              </div>
              <Button
                onClick={() => handleDelete(todo.id)}
                className="ml-auto"
                size="icon"
                variant="outline"
              >
                <FaTrashAlt />
                <span className="sr-only">削除</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {selectedGroup === null ? (
        <p className="text-sm text-red-500 dark:text-red-400">
          サイドバーからグループを選択してください。
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 items-center my-4">
            <Input
              {...register('content', { required: '内容を入力してください。' })}
              id="task"
              placeholder="タスク"
            />
            {errors.content && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.content.message}
              </span>
            )}
            <div className="flex items-center gap-2">
              <Label htmlFor="due-date">期日</Label>
              <Input
                {...register('deadline', {
                  required: '期限を入力してください。',
                })}
                id="due-date"
                type="date"
              />
            </div>
            {errors.deadline && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.deadline.message}
              </span>
            )}
            <Button
              className="bg-pink-600 text-white dark:bg-pink-400 dark:text-gray-900 self-center text-sm"
              type="submit"
            >
              追加
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default TodoList
