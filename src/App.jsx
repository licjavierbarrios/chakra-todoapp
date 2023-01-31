import { VStack, Heading, useColorMode, IconButton } from "@chakra-ui/react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
const App = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const deleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};
	function addTodo(todo) {
		setTodos([...todos, todo]);
	}

	const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<VStack p={4}>
			<IconButton
				icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
				isRound="true"
				alignSelf="flex-end"
				size="lg"
				onClick={toggleColorMode}
			/>
			<Heading mb="8px" size="2xl" fontWeight="extrabold" bgGradient="linear(to-r, red, salmon, pink)" bgClip="text">
				Tareas Application
			</Heading>
			<TodoList todos={todos} deleteTodo={deleteTodo} />
			<AddTodo addTodo={addTodo} />
		</VStack>
	);
};
export default App;
