import React from "react";
import useApp from "../AppContext";

function ActiveTasks() {
  const {
    taskArray,
    selectedTaskArray,
    handleChangeCheckbox,
    handleDeleteTask,
    handleCompleteTask,
    handleSelectAll,
    handleDeleteSelected,
    handleCompleteSelected,
  } = useApp();

  let isNoneSelected = selectedTaskArray.length === 0;

  return (
    <div>
      <ul>
        {taskArray.map((task) => {
          return (
            <li key={task.key} id={`task${task.key}`}>
              <input
                type={"checkbox"}
                onChange={() => handleChangeCheckbox(task.key)}
                checked={task.isChecked}
              ></input>
              <span>{task.text}</span>
              <button onClick={() => handleDeleteTask(task.key)}>Delete</button>
              <button onClick={() => handleCompleteTask(task.key)}>
                Complete
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleSelectAll}>Select all</button>
      <button onClick={handleDeleteSelected} disabled={isNoneSelected}>Delete selected</button>
      <button onClick={handleCompleteSelected} disabled={isNoneSelected}>Complete selected</button>
    </div>
  );
}

export default ActiveTasks;
