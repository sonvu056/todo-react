import axios from "axios";
import UserService from "./UserService"

const apiEndpoint = "http://localhost:5000";

const GetTodoList = () => {
  return axios.get(apiEndpoint + "/Todo/GetTodos", {
    params: {
      user: UserService.getUserName(),
    },
  });
};

const AddTodo = (inputValue) => {
  axios.post(apiEndpoint +  "/Todo/AddTodo", {
    user: "sylk",
    taskName: inputValue,
  });
};

const TodoService = {
  GetTodoList,
  AddTodo,
};

export default TodoService;
