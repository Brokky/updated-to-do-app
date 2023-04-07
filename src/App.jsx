import { useReducer, useRef } from "react";
import useApp from "./AppContext";

function App() {

  const taskInput = useRef(null);

  const {
    taskArray,
    completedTaskArray,
    taskCount,
    completedTaskCount,
    activeTaskCount,
    handleAddTask,
    handleChangeCheckbox,
    handleCompleteSelected,
    handleCompleteTask,
    handleDeleteSelected,
    handleDeleteTask,
    handleSelectAll } = useApp();

  return (
    <div>
      <nav>
        <ul>
          <li><a href="#">Add new task</a></li>
          <li><a href="#">Active tasks</a></li>
          <li><a href="#">Completed tasks</a></li>
        </ul>
      </nav>
      <input ref={taskInput} type={'text'} placeholder='Add a new task...'></input>
      <button onClick={() => handleAddTask(taskInput)}>Add</button>
      <p>Total tasks: {taskCount} | Active tasks: {activeTaskCount} | Completed tasks: {completedTaskCount}</p>
      <ul>
        {taskArray.map(task => {
          return (
            <li key={task.key} id={`task${task.key}`}>
              <input type={'checkbox'} onChange={() => handleChangeCheckbox(task.key)} checked={task.isChecked}></input>
              <span>{task.text}</span>
              <button onClick={() => handleDeleteTask(task.key)}>Delete</button>
              <button onClick={() => handleCompleteTask(task.key)}>Complete</button>
            </li>
          )
        })}
      </ul>
      <button onClick={handleSelectAll}>Select all</button>
      <button onClick={handleDeleteSelected}>Delete selected</button>
      <button onClick={handleCompleteSelected}>Complete selected</button>
      <br></br>
      <ul>
        {completedTaskArray.map(task => {
          return (
            <li key={task.key} id={`task${task.key}`}>
              <span>{task.text}</span>
              <p>Completed: {task.date}</p>
            </li>
          )
        })}
      </ul>

    </div>
  )
}

export default App
