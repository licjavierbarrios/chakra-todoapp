import React from "react";
import { VStack, Spacer, HStack, IconButton, Text, StackDivider, Badge } from "@chakra-ui/react";
import { FaTrash, FaBars } from "react-icons/fa";

const TodoList = ({ todos, setTodos, deleteTodo, underlineTodo, colorMode }) => {
	// Save reference for dragItem and dragOverItem
	const dragItem = React.useRef();
	const dragOverItem = React.useRef();

	const handleDragSort = () => {
		// get the index of the item being dragged
		const dragItemIndex = todos.findIndex((todo) => todo.id === dragItem.current);
		// get the index of the item being dragged over
		const dragOverItemIndex = todos.findIndex((todo) => todo.id === dragOverItem.current);
		// get the item being dragged
		const itemDragged = todos[dragItemIndex];
		// get the item being dragged over
		const itemDraggedOver = todos[dragOverItemIndex];
		// update the todos array with the dragged and dragged over items swapped
		const newTodos = todos.map((todo) => {
			if (todo.id === itemDragged.id) {
				return itemDraggedOver;
			}
			if (todo.id === itemDraggedOver.id) {
				return itemDragged;
			}
			return todo;
		});
		// update the todos state
		setTodos(newTodos);
	};

	if (!todos.length) {
		return (
			<Badge colorScheme="green" p="4" m="4" borderRadius="lg">
				No hay tareas!!!
			</Badge>
		);
	}

	return (
		<VStack
			maxW={["90vh", "80vw", "50vw", "40vw"]}
			divider={<StackDivider />}
			w="100%"
			borderColor="gray.200"
			borderWidth="2px"
			borderRadius="lg"
			p={4}
			alignItems="stretch"
		>
			{todos.map((todo) => (
				<HStack
					key={todo.id}
					//hacer elemento dragable
					draggable="true"
					onDragStart={(e) => (dragItem.current = todo.id)}
					onDragEnter={(e) => (dragOverItem.current = todo.id)}
					onDragEnd={handleDragSort}
					// efecto mover elemento
					transition="all 0.2s"
					// quitar el cursor grab cuando se mueve el elemento

					onDragOver={(e) => e.preventDefault()}
					onDragLeave={(e) => e.preventDefault()}
				>
					<IconButton icon={<FaBars />} color={colorMode === "light" ? "black" : "gray.200"} isRound="true" cursor="grab" />
					<Text
						onClick={() => underlineTodo(todo.id)}
						textDecoration={todo.completed ? "line-through" : "none"}
						fontWeight={todo.completed ? "normal" : "bold"}
						// si todo.completed color = gray.400, si no color = gray.800 y en modo oscuro color white
						color={colorMode === "light" ? (todo.completed ? "gray.400" : "gray.800") : todo.completed ? "gray.400" : "white"}
						// {todo.completed ? "gray.700" : "gray.300"}
					>
						{todo.body}
					</Text>
					<Spacer />
					<IconButton
						icon={<FaTrash />}
						color={colorMode === "light" ? "black" : "gray.200"}
						isRound="true"
						onClick={() => deleteTodo(todo.id)}
					/>
				</HStack>
			))}
		</VStack>
	);
};
export default TodoList;
