import { toast } from "sonner";
import { nanoid } from "nanoid";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AddTodo = ({ addTodo, content, setContent, edit, setTodos, todos, setEdit }) => {
	function handleSubmit(e) {
		e.preventDefault();

		const todo = {
			id: nanoid(),
			body: content,
			completed: false,
		};
		if (content.length < 3) {
			toast.error("Tarea vacía o demasiado corta, mínimo 3 caracteres.");
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
			toast.success("Tarea actualizada correctamente");
			setContent("");
			return;
		} else {
			// verificar que no haya tareas repetidas
			const todoExist = todos.find((todo) => todo.body === content);
			if (todoExist) {
				toast.error("Tarea ya existente.");
				return;
			}

			addTodo(todo);
			toast.success("Tarea agregada correctamente");
		}

		setContent("");
	}

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<div className="flex gap-2 w-full">
				<Input
					placeholder="Ingrese tarea..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="flex-1"
				/>
				<Button type="submit">
					{edit.body !== "" ? "Editar" : "Agregar"}
				</Button>
			</div>
		</form>
	);
};
export default AddTodo;
