import React, { useState } from "react";
import { VStack, HStack, Text, Checkbox } from "@chakra-ui/react";

const CampingList = () => {
  const initialItems = [
    { id: 1, name: "Carpa", completed: false },
    { id: 2, name: "Bolsa de dormir", completed: false },
    { id: 3, name: "Linterna", completed: false },
    // Agrega más elementos según sea necesario
  ];

  const [items, setItems] = useState(initialItems);

  const toggleItemCompletion = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <VStack>
      {items.map((item) => (
        <HStack key={item.id}>
          <Checkbox
            isChecked={item.completed}
            onChange={() => toggleItemCompletion(item.id)}
          >
            <Text as={item.completed ? "s" : "span"}>{item.name}</Text>
          </Checkbox>
        </HStack>
      ))}
    </VStack>
  );
};

export default CampingList;
