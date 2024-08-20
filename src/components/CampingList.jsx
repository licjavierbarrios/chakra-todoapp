import React, { useState } from "react";
import {
  VStack,
  HStack,
  Text,
  Checkbox,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import campingItems from "../data/campingItems";
import { nanoid } from "nanoid";

const CampingList = () => {
  const [items, setItems] = useState(campingItems);
  const [newItemName, setNewItemName] = useState("");
  const toast = useToast();

  const toggleItemCompletion = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddItem = () => {
    if (newItemName.length < 3) {
      toast({
        title: "Nombre inválido.",
        description: "El nombre del ítem debe tener al menos 3 caracteres.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newItem = {
      id: nanoid(),
      name: newItemName,
      completed: false,
    };
    setItems([newItem, ...items]);
    setNewItemName(""); // Limpiar el input después de agregar el ítem
    toast({
      title: "Item agregado.",
      description: `Se ha agregado "${newItemName}" a la lista.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Input
          placeholder="Nombre del ítem"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddItem}>
          Agregar
        </Button>
      </HStack>

      {items.map((item) => (
        <HStack key={item.id} borderWidth="1px" borderRadius="md" p={2}>
          <Checkbox
            isChecked={item.completed}
            onChange={() => toggleItemCompletion(item.id)}
          >
            <Text fontWeight={item.completed ? "bold" : "normal"}>
              {item.name}
            </Text>
          </Checkbox>
        </HStack>
      ))}
    </VStack>
  );
};

export default CampingList;
