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
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { useAppContext } from '@/context/AppContext'

type Todo = {
  id: string
  content: string
  deadline: Timestamp
  completed: boolean
  createdAt: Timestamp
  userId: string
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const { selectedGroup } = useAppContext()

  useEffect(() => {
    const fetchTodos = async () => {
      if (selectedGroup) {
        // 'groups'コレクション内の特定のドキュメントIDを持つドキュメント参照を取得
        const groupDocRef = doc(db, 'groups', selectedGroup)
        // 上記のドキュメント参照を使用して、'todos'サブコレクションへの参照を作成
        const todoCollectionRef = collection(groupDocRef, 'todos')
        const q = query(todoCollectionRef, orderBy('deadline'))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newTodos: Todo[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            content: doc.data().content,
            deadline: doc.data().deadline,
            completed: doc.data().completed || false,
            createdAt: doc.data().createdAt,
            userId: doc.data().userId,
          }))
          setTodos(newTodos)
        })
      }
    }
    fetchTodos()
  }, [selectedGroup])

  const handleToggle = async (id: string, completed: boolean) => {
    if (!selectedGroup) return // グループが選択されていない場合は何もしない
    const todoDocRef = doc(db, 'groups', selectedGroup, 'todos', id)
    await updateDoc(todoDocRef, {
      completed: !completed,
    })
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
              <Button className="ml-auto" size="icon" variant="outline">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">削除</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center my-4">
        <Input id="task" placeholder="タスク" />
        <div className="flex items-center gap-2">
          <Label htmlFor="due-date">期日</Label>
          <Input id="due-date" type="date" />
        </div>
        <Button
          className="bg-pink-600 text-white dark:bg-pink-400 dark:text-gray-900 self-center text-sm"
          type="submit"
        >
          追加
        </Button>
      </div>
    </div>
  )
}

export default TodoList

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
