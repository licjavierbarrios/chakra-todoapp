import { VStack, Heading, useColorMode, IconButton, Spacer } from "@chakra-ui/react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
const App = () => {
	const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || []);
	const [content, setContent] = useState("");
	// crear un estado para editar todo
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
			<Heading size="2xl" fontWeight="extrabold" bgGradient="linear(to-r, red, salmon, pink)" bgClip="text">
				Todo App
			</Heading>
			<Spacer />
			<AddTodo
				addTodo={addTodo}
				setTodos={setTodos}
				colorMode={colorMode}
				edit={edit}
				upDateTodo={upDateTodo}
				content={content}
				setContent={setContent}
				todos={todos}
				setEdit={setEdit}
			/>
			<TodoList
				todos={todos}
				deleteTodo={deleteTodo}
				underlineTodo={underlineTodo}
				colorMode={colorMode}
				setTodos={setTodos}
				setEdit={setEdit}
			/>
			
		</VStack>
	);
};
export default App;
