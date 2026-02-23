import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./components/ui/button";
import { useTheme } from "./components/theme-provider";
import MenuList from "./components/MenuList";

const App = () => {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState({
    id: null,
    body: "",
  });

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-pink-400 bg-clip-text text-transparent">
            Todo App
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
        <MenuList
          todos={todos}
          deleteTodo={deleteTodo}
          underlineTodo={underlineTodo}
          addTodo={addTodo}
          setEdit={setEdit}
          content={content}
          setContent={setContent}
          edit={edit}
          upDateTodo={upDateTodo}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
};

export default App;
