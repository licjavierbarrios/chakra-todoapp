import { VStack, Spacer, HStack, IconButton, Text, StackDivider, Badge } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const TodoList = ({ todos, deleteTodo }) => {
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
				<HStack key={todo.id}>
					<Text>{todo.body}</Text>
					<Spacer />
					<IconButton icon={<FaTrash />} color="black" isRound="true" onClick={() => deleteTodo(todo.id)} />
				</HStack>
			))}
		</VStack>
	);
};
export default TodoList;
