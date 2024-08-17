import {
  VStack,
  Heading,
  useColorMode,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import MenuList from "./components/MenuList"; // Agregamos el componente MenuList

const App = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState({
    id: null,
    body: "",
  });

  const { colorMode, toggleColorMode } = useColorMode();
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const upDateTodo = (id, newTodo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, body: newTodo };
        }
        return todo;
      })
    );
  };

  const underlineTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (edit !== null) {
      setContent(edit.body);
    } else {
      setContent("");
    }
  }, [edit.id]);

  return (
    <VStack p={2}>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound="true"
        alignSelf="flex-end"
        size="lg"
        onClick={toggleColorMode}
      />
      <Heading
        size="2xl"
        fontWeight="extrabold"
        bgGradient="linear(to-r, red, salmon, pink)"
        bgClip="text"
      >
        Todo App
      </Heading>
      <Spacer />
      <MenuList
        todos={todos}
        deleteTodo={deleteTodo}
        underlineTodo={underlineTodo}
        addTodo={addTodo}
        setEdit={setEdit}
        colorMode={colorMode}
        content={content}
        setContent={setContent}
        edit={edit}
        upDateTodo={upDateTodo}
        setTodos={setTodos}
      />
    </VStack>
  );
};

export default App;
