import { Input } from "antd";
import { Button } from "antd";
import { useEffect, useState } from "react";
import TodoService from "./TodoService";
export default function AxiosPlayground() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoadng] = useState(true);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(1);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadng(true);
        setIsError(false);
        const todoListPromise = await TodoService.GetTodoList();
        setTodos(todoListPromise.data.data);
      } catch (error) {
        setIsError(true);
        console.log("loi roi");
      } finally {
        setIsLoadng(false);
      }
    };

    fetchData();
  }, [retryCount]);

  const handleTryAgain = () => {
    setRetryCount(retryCount + 1);
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePressEnter = async () => {
    setIsLoadng(true);

    try {
      TodoService.AddTodo(inputValue);

      setRetryCount(retryCount + 1);

      setInputValue("");
    } catch (error) {
    } finally {
      setIsLoadng(false);
    }
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      {!isError ? (
        <>
          <Input
            placeholder="Nhập tên task rồi ấn enter"
            value={inputValue}
            onChange={handleOnChange}
            onPressEnter={handlePressEnter}
          />
          <div>{todos.length}</div>;
        </>
      ) : (
        <div>
          <Button onClick={handleTryAgain}>Try Again</Button>
        </div>
      )}
    </>
  );
}
