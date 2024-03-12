/**
 * v0 by Vercel.
 * @see https://v0.dev/t/J0ok6YkwQGe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const TodoList = () => {
  return (
    <div>
      <h1 className="text-xl lg:text-2xl font-bold tracking-tight">
        ToDoリスト
      </h1>
      <div className="bg-blue-100 rounded-lg dark:bg-blue-800 my-4">
        <ul className="divide-y divide-blue-200 dark:divide-blue-800">
          <li className="flex items-center p-4 space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="task-0" />
              <label className="leading-none" htmlFor="task-0">
                投稿者: User1 - Task 1
              </label>
              <span className="text-sm text-blue-500 dark:text-blue-400">
                2024-03-15 期日
              </span>
            </div>
            <Button className="ml-auto" size="icon" variant="outline">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">削除</span>
            </Button>
          </li>
          <li className="flex items-center p-4 space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="task-1" />
              <label className="leading-none" htmlFor="task-1">
                投稿者: User2 - Task 2
              </label>
              <span className="text-sm text-blue-500 dark:text-blue-400">
                2024-03-17 期日
              </span>
            </div>
            <Button className="ml-auto" size="icon" variant="outline">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">削除</span>
            </Button>
          </li>
          <li className="flex items-center p-4 space-x-4 line-through">
            <div className="flex items-center space-x-2">
              <Checkbox checked id="task-2" />
              <label className="leading-none" htmlFor="task-2">
                投稿者: User3 - Task 3
              </label>
              <span className="text-sm text-blue-500 dark:text-blue-400">
                2024-03-20 期日
              </span>
            </div>
            <Button className="ml-auto" size="icon" variant="outline">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">削除</span>
            </Button>
          </li>
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
