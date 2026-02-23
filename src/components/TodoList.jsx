import React from "react";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const TodoList = ({ todos, setTodos, deleteTodo, underlineTodo, setEdit }) => {
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
			<div className="flex justify-center p-8">
				<div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-6 py-3 rounded-lg font-medium">
					No hay tareas!!!
				</div>
			</div>
		);
	}

	return (
		<Card className="w-full max-w-3xl mx-auto">
			<div className="divide-y">
				{todos.map((todo) => (
					<div
						key={todo.id}
						draggable="true"
						onDragStart={(e) => (dragItem.current = todo.id)}
						onDragEnter={(e) => (dragOverItem.current = todo.id)}
						onDragEnd={handleDragSort}
						onDragOver={(e) => e.preventDefault()}
						onDragLeave={(e) => e.preventDefault()}
						className="flex items-center gap-3 p-4 transition-colors hover:bg-muted/50 cursor-move"
					>
						<p
							onClick={() => underlineTodo(todo.id)}
							className={`flex-1 cursor-pointer transition-all ${
								todo.completed
									? "line-through text-muted-foreground"
									: "font-semibold text-foreground"
							}`}
						>
							{todo.body}
						</p>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setEdit({ id: todo.id, body: todo.body })}
							className="shrink-0"
						>
							<Edit2 className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => deleteTodo(todo.id)}
							className="shrink-0 text-destructive hover:text-destructive"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				))}
			</div>
		</Card>
	);
};
export default TodoList;
