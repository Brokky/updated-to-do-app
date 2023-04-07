export const initialState = {
    taskArray: [],
    selectedTaskArray: [],
    completedTaskArray: [],
    taskCount: 0,
    completedTaskCount: 0,
    activeTaskCount: 0,
    key: 0,
  }

  const appReducer = (state, action) => {

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

      case 'ADD_TASK':

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

      case 'DELETE_TASK':

        return {
          ...state,
          taskArray: [...state.taskArray.filter(task => task.key !== action.key)],
          selectedTaskArray: [...state.selectedTaskArray.filter(task => task.key !== action.key)],
          activeTaskCount: state.activeTaskCount - 1,
          taskCount: state.taskCount - 1,
        };

      case 'COMPLETE_TASK':

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

      case 'SELECT_TASK':

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

      case 'DELETE_SELECTED':

        return {
          ...state,
          taskCount: state.taskCount - state.selectedTaskArray.length,
          activeTaskCount: state.activeTaskCount - state.selectedTaskArray.length,
          taskArray: [...state.taskArray.filter(task => !state.selectedTaskArray.includes(task))],
          selectedTaskArray: [],
        }

      case 'COMPLETE_SELECTED':

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

      case 'SELECT_ALL':

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

  export default appReducer;