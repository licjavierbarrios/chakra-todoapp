import { HStack, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { nanoid } from "nanoid";
const AddTodo = ({ addTodo, colorMode, content, setContent, edit, setTodos, todos, setEdit }) => {
	// const [content, setContent] = useState("");
	const toast = useToast();

	function handleSubmit(e) {
		e.preventDefault();

		const todo = {
			id: nanoid(),
			body: content,
			completed: false,
		};
		if (content.length < 3) {
			toast({
				title: "Tarea vacia o demasiado corta, mínimo 3 caracteres.",
				status: "error",
				duration: 2000,
				isClosable: true,
			});
			return;
		}

		if (edit.id !== null) {
			setTodos(
				todos.map((todo) => {
					if (todo.id === edit.id) {
						return { ...todo, body: content };
					}
					return todo;
				})
			);
			setEdit({
				id: null,
				body: "",
			});
			return;
		} else {
			// verificar que no haya tareas repetidas
			const todoExist = todos.find((todo) => todo.body === content);
			if (todoExist) {
				toast({
					title: "Tarea ya existente.",
					status: "error",
					duration: 2000,
					isClosable: true,
				});
				return;
			}

			addTodo(todo);
		}

		setContent("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<HStack mt="8">
				<Input
					variant="filled"
					placeholder="Ingrese tarea..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					_placeholder={{ color: colorMode === "light" ? "gray.800" : "gray.300" }}
					_focus={{ borderColor: "pink.500" }}
				/>
				<Button colorScheme="pink" px="8" type="submit" onClick={handleSubmit}>
					{edit.body !== "" ? "Editar tarea" : "Agregar tarea"}
				</Button>
			</HStack>
		</form>
	);
};
export default AddTodo;
