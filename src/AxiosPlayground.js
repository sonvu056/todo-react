import { Input } from "antd";
import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
export default function AxiosPlayground() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoadng] = useState(true);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePressEnter = async () => {
    setIsLoadng(true);

    try {
      await axios.post("http://localhost:5000/Todo/AddTodo", {
        user: "sylk",
        taskName: inputValue,
      });

      setRetryCount(retryCount + 1);

      setInputValue("");

    } catch (error) {

    } finally {
      setIsLoadng(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadng(true);
        setIsError(false);
        const todoListPromise = await axios.get(
          "http://localhost:5000/Todo/GetTodos",
          {
            params: {
              user: "sylk",
            },
          }
        );
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
