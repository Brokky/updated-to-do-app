import { useReducer, useRef } from "react";

function App() {

  const taskInput = useRef(null);

  const ADD_TASK = 'add task';
  const DELETE_TASK = 'delete task';
  const COMPLETE_TASK = 'complete task';
  const SELECT_TASK = 'select task';
  const DELETE_SELECTED = 'delete selected';
  const COMPLETE_SELECTED = 'complete selected';
  const SELECT_ALL = 'select all';


  const reducer = (state, action) => {

    function getTask(arr, key) {
      return arr.find(task => task.key === key);
    }

    // for data formatting
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    switch (action.type) {

      case ADD_TASK:

        return {
          ...state,
          taskArray: [...state.taskArray, {
            text: action.task,
            key: state.key,
            isChecked: false,
          }],
          taskCount: state.taskCount + 1,
          activeTaskCount: state.activeTaskCount + 1,
          key: state.key + 1,
        };

      case DELETE_TASK:

        return {
          ...state,
          taskArray: [...state.taskArray.filter(task => task.key !== action.key)],
          selectedTaskArray: [...state.selectedTaskArray.filter(task => task.key !== action.key)],
          activeTaskCount: state.activeTaskCount - 1,
          taskCount: state.taskCount - 1,
        };

      case COMPLETE_TASK:

        const completedTask = getTask(state.taskArray, action.key);

        completedTask.date = action.date.toLocaleString('en-US', options);

        return {
          ...state,
          completedTaskArray: [...state.completedTaskArray, completedTask],
          selectedTaskArray: [...state.selectedTaskArray.filter(task => task.key !== action.key)],
          taskArray: [...state.taskArray.filter(task => task.key !== action.key)],
          activeTaskCount: state.activeTaskCount - 1,
          completedTaskCount: state.completedTaskCount + 1,
        };

      case SELECT_TASK:

        const updatedTaskArray = state.taskArray.map(task => {
          return task.key === action.key
            ? {
              ...task,
              isChecked: !task.isChecked,
            }
            : task;
        })

        const selectedTask = getTask(updatedTaskArray, action.key);

        return state.selectedTaskArray.includes(selectedTask)
          ? {
            ...state,
            taskArray: updatedTaskArray,
            selectedTaskArray: state.selectedTaskArray.filter(task => task.key !== action.key),
          }
          : {
            ...state,
            taskArray: updatedTaskArray,
            selectedTaskArray: [...state.selectedTaskArray, selectedTask],
          };

      case DELETE_SELECTED:

        return {
          ...state,
          taskCount: state.taskCount - state.selectedTaskArray.length,
          activeTaskCount: state.activeTaskCount - state.selectedTaskArray.length,
          taskArray: [...state.taskArray.filter(task => !state.selectedTaskArray.includes(task))],
          selectedTaskArray: [],
        }

      case COMPLETE_SELECTED:

        const completedSelectedTaskArray = state.selectedTaskArray.map(task => {
          task.date = action.date.toLocaleString('en-US', options);
          return task;
        });

        return {
          ...state,
          completedTaskCount: state.completedTaskCount + state.selectedTaskArray.length,
          activeTaskCount: state.activeTaskCount - state.selectedTaskArray.length,
          taskArray: [...state.taskArray.filter(task => !state.selectedTaskArray.includes(task))],
          completedTaskArray: [...state.completedTaskArray, ...completedSelectedTaskArray],
          selectedTaskArray: [],
        }

      case SELECT_ALL:

        const isAllChecked = state.taskArray.every(task => task.isChecked);

        const newTaskArray = state.taskArray.map(task => {
          return isAllChecked
            ? {
              ...task,
              isChecked: false,
            }
            : {
              ...task,
              isChecked: true,
            };
        })

        return {
          ...state,
          taskArray: [...newTaskArray],
          selectedTaskArray: isAllChecked ? [] : [...newTaskArray],
        }

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    taskArray: [],
    selectedTaskArray: [],
    completedTaskArray: [],
    taskCount: 0,
    completedTaskCount: 0,
    activeTaskCount: 0,
    key: 0,
  });

  function handleAddTask() {
    if (taskInput.current.value === '') return;

    dispatch({ type: ADD_TASK, task: taskInput.current.value });
    taskInput.current.value = '';
  }

  function handleDeleteTask(key) {
    dispatch({ type: DELETE_TASK, key: key });
  }

  function handleCompleteTask(key) {
    dispatch({ type: COMPLETE_TASK, key: key, date: new Date() });
  }

  function handleChangeCheckbox(key) {
    dispatch({ type: SELECT_TASK, key: key });
  }

  function handleDeleteSelected() {
    dispatch({ type: DELETE_SELECTED });
  }

  function handleCompleteSelected() {
    dispatch({ type: COMPLETE_SELECTED, date: new Date() });
  }

  function handleSelectAll() {
    dispatch({ type: SELECT_ALL });
  }


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
      <button onClick={handleAddTask}>Add</button>
      <p>Total tasks: {state.taskCount} | Active tasks: {state.activeTaskCount} | Completed tasks: {state.completedTaskCount}</p>
      <ul>
        {state.taskArray.map(task => {
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
        {state.completedTaskArray.map(task => {
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
