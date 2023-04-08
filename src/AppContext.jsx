import { createContext, useReducer, useContext } from "react";
import appReducer, { initialState } from "./appReducer";

const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function handleAddTask(taskInput) {
    if (taskInput.current.value === "") return;

    dispatch({ type: "ADD_TASK", task: taskInput.current.value });
    taskInput.current.value = "";
  }

  function handleDeleteTask(key) {
    dispatch({ type: "DELETE_TASK", key: key });
  }

  function handleCompleteTask(key) {
    dispatch({ type: "COMPLETE_TASK", key: key, date: new Date() });
  }

  function handleChangeCheckbox(key) {
    dispatch({ type: "SELECT_TASK", key: key });
  }

  function handleDeleteSelected() {
    dispatch({ type: "DELETE_SELECTED" });
  }

  function handleCompleteSelected() {
    dispatch({ type: "COMPLETE_SELECTED", date: new Date() });
  }

  function handleSelectAll() {
    dispatch({ type: "SELECT_ALL" });
  }

  const value = {
    taskArray: state.taskArray,
    selectedTaskArray: state.selectedTaskArray,
    completedTaskArray: state.completedTaskArray,
    taskCount: state.taskCount,
    completedTaskCount: state.completedTaskCount,
    activeTaskCount: state.activeTaskCount,
    key: state.key,
    handleAddTask,
    handleChangeCheckbox,
    handleCompleteSelected,
    handleCompleteTask,
    handleDeleteSelected,
    handleDeleteTask,
    handleSelectAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp must be used within AppContext");
  }

  return context;
};

export default useApp;
