import { HStack, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { nanoid } from "nanoid";
const AddTodo = ({ addTodo }) => {
	const [content, setContent] = useState("");
	const toast = useToast();

	function handleSubmit(e) {
		e.preventDefault();
		const todo = {
			id: nanoid(),
			body: content,
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
		addTodo(todo);
		setContent("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<HStack mt="8">
				<Input variant="filled" placeholder="Ingrese tarea..." value={content} onChange={(e) => setContent(e.target.value)} />
				<Button colorScheme="pink" px="8" type="submit">
					Agregar Tarea
				</Button>
			</HStack>
		</form>
	);
};
export default AddTodo;
