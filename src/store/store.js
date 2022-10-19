import { createStore } from "redux";
import { taskReducer } from "./taskReducer";

const initialState = [
  { id: 1, title: "Task-1", completed: false },
  { id: 2, title: "Task-2", completed: false },
  { id: 3, title: "Task-3", completed: true },
  { id: 4, title: "Task-4", completed: false },
  { id: 5, title: "Task-5", completed: true },
];

export function initiateStore() {
  return createStore(taskReducer, initialState);
}
