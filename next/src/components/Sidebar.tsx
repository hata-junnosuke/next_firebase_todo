import { BiLogOut } from 'react-icons/bi'

const Sidebar = () => {
  return (
    <div className="bg-pink-600 text-white h-full overflow-y-auto px-5 flex flex-col">
      <div className="flex-grow">
        <div
          // onClick={addNewRoom}
          className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150"
        >
          <span className="text-white p-4 text-2xl">＋</span>
          <h1 className="text-white text-xl font-semibold p-4">New Group</h1>
        </div>
        <ul>
          <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150 ">
            Group 2
          </li>
          <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150 ">
            Group 3
          </li>
          <li className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150 ">
            Group 4
          </li>
        </ul>
      </div>

      {/* {user && (
        <div className="mb-2 p-4 text-slate-100 text-lg font-medium">
          {user.email}
        </div>
      )} */}
      <div
        // onClick={() => handleLogout()}
        className="text-lg flex items-center justify-evenly mb-2 cursor-pointer border p-4 text-slate-100 hover:bg-blue-800 duration-150"
      >
        <BiLogOut />
        <span>ログアウト</span>
      </div>
    </div>
  )
}

export default Sidebar
