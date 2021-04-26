import {
  AddTodoSuccess,
  BeginAddTodo,
  ChangeInputValueType,
  ChangeStatusCompleteValue,
  ChooseFavouriteTaskValue,
} from "../ActionType";
import { v4 as uuidv4 } from "uuid";
import MockTask from "../../MockTasks";

export const todo = (
  state = {
    taskList: [...MockTask],
    newTaskName: "",
    isLoading: true,
    isError: false,
  },
  action
) => {
  switch (action.type) {
    case BeginAddTodo: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case AddTodoSuccess: {
      const newTask = {
        id: uuidv4(),
        taskName: action.payload.newTaskName,
        isCompleted: false,
        isFavourite: false,
        createdDate: new Date(),
        completedDate: "",
        isLoading: false,
        isError: false,
      };
      return {
        ...state,
        newTaskName: "",
        taskList: [...state.taskList, newTask],
      };
    }
    case ChangeInputValueType: {
      return { ...state, newTaskName: action.payload.newInputValue };
    }
    case ChangeStatusCompleteValue: {
      const newTaskList = state.taskList.map((task) =>
        task.id === action.payload.id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );
      console.log(newTaskList);
      return { ...state, taskList: newTaskList };
    }
    case ChooseFavouriteTaskValue: {
      const newTaskList = state.taskList.map((task) =>
        task.id === action.payload.id
          ? { ...task, isFavourite: !task.isFavourite }
          : task
      );
      return { ...state, taskList: newTaskList };
    }
    default:
      return state;
  }
};
