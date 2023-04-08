import { useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import useApp from "./AppContext";

function App() {

  const taskInput = useRef(null);

  const {
    taskCount,
    completedTaskCount,
    activeTaskCount,
    handleAddTask,
  } = useApp();

  return (
    <div>
      <nav>
        <ul>
          <li><Link to={"/active-tasks"}>Active tasks</Link></li>
          <li><Link to={"/completed-tasks"}>Completed tasks</Link></li>
        </ul>
      </nav>
      <input ref={taskInput} type={'text'} placeholder='Add a new task...'></input>
      <button onClick={() => handleAddTask(taskInput)}><Link to={"/active-tasks"}>Add</Link></button>
      <p>Total tasks: {taskCount} | Active tasks: {activeTaskCount} | Completed tasks: {completedTaskCount}</p>
      <Outlet />
    </div>
  )
}

export default App
