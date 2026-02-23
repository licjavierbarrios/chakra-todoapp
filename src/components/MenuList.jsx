import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import TodoList from "./TodoList";
import CeliacShoppingList from "./ShoppingList/CeliacShoppingList";
import CampingList from "./CampingList";
import AddTodo from "./AddTodo";

const MenuList = ({
  todos,
  deleteTodo,
  underlineTodo,
  addTodo,
  setEdit,
  content,
  setContent,
  edit,
  upDateTodo,
  setTodos,
}) => {
  return (
    <Tabs defaultValue="tareas" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="tareas">Lista de Tareas</TabsTrigger>
        <TabsTrigger value="celiaco">Lista Celíaco</TabsTrigger>
        <TabsTrigger value="camping">Lista Camping</TabsTrigger>
      </TabsList>

      <TabsContent value="tareas" className="space-y-4">
        <AddTodo
          addTodo={addTodo}
          setTodos={setTodos}
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
          setEdit={setEdit}
          setTodos={setTodos}
        />
      </TabsContent>

      <TabsContent value="celiaco">
        <CeliacShoppingList />
      </TabsContent>

      <TabsContent value="camping">
        <CampingList />
      </TabsContent>
    </Tabs>
  );
};

export default MenuList;
