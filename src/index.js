import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  titleChanged,
  taskDeleted,
  createTask,
  completeTask,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
} from "./store/task";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  const newTaskData = {
    userId: 1,
    title: "Some New Task",
    completed: false,
  };

  const addNewTask = (newTaskData) => {
    dispatch(createTask(newTaskData));
  };

  if (isLoading) return <h1>Loading</h1>;

  if (error) return <p>{error}</p>;

  return (
    <>
      {" "}
      <h1>App</h1>
      <button onClick={() => addNewTask(newTaskData)}>Create task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>

            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
