import TodoService from "../TodoService";
import {
  AddNewTaskValue,
  ChangeInputValueType,
  GetTasksListValue,
  ChangeStatusCompleteValue,
  ChooseFavouriteTaskValue,
  LoginSucces,
  LogoutSucces,
  BeginAddTodo,
  AddTodoSuccess,
} from "./ActionType";

export const ChangeInputValue = (newInputValue) => {
  return {
    type: ChangeInputValueType,
    payload: {
      newInputValue,
    },
  };
};
export const GetTasksList = (tasksList) => {
  return {
    type: GetTasksListValue,
    payload: {
      tasksList,
    },
  };
};
export const AddNewTask = (newTaskName) => {
  return {
    type: AddNewTaskValue,
    payload: {
      newTaskName,
    },
  };
};

export const ChangeStatusComplete = (id, value) => {
  return {
    type: ChangeStatusCompleteValue,
    payload: {
      id,
      value,
    },
  };
};

export const ChooseFavouriteTask = (id, value) => {
  return {
    type: ChooseFavouriteTaskValue,
    payload: {
      id,
      value,
    },
  };
};

export const AttempLogin = () => {
  return {
    type: LoginSucces,
  };
};

export const AttempLogout = () => {
  return {
    type: LogoutSucces,
  };
};

export const AddNewTaskAsync = (inputValue) => async (dispatch, getState) => {
  dispatch({
    type: BeginAddTodo
  })
  try {
    await TodoService.AddTodo(inputValue);
    dispatch({
      type: AddTodoSuccess,
      payload: {
        newTaskName: inputValue,
      }
    })
  } catch (error) {}
};
