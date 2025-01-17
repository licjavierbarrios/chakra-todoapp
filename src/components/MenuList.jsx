import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Box,
} from "@chakra-ui/react";
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
  colorMode,
  content,
  setContent,
  edit,
  upDateTodo,
  setTodos,
}) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="pink" align="center" isFitted>
      <TabList>
        <Tab>Lista de Tareas</Tab>
        <Tab>Lista Celíaco</Tab>
        <Tab>Lista Camping</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <VStack>
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
              setEdit={setEdit}
              colorMode={colorMode}
            />
          </VStack>
        </TabPanel>
        <TabPanel>
          <Box w="100%">
            <CeliacShoppingList />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box w="100%">
            <CampingList />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MenuList;
