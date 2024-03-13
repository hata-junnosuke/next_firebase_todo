import Sidebar from '@/components/Sidebar'
import TodoList from '@/components/TodoList'

export default function Home() {
  return (
    <div className="lex h-screen justify-center items-center">
      <div className="h-full flex" style={{ width: '1280px' }}>
        <div className="w-1/5 h-full border-r">
          <Sidebar />
        </div>
        <div className="w-4/5 h-full px-4">
          <TodoList />
        </div>
      </div>
    </div>
  )
}
