import React, { useState } from "react";
import { VStack, HStack, Text, Checkbox } from "@chakra-ui/react";
import campingItems from "../data/campingItems";

const CampingList = () => {
  

  const [items, setItems] = useState(campingItems);

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
