// src/components/ShoppingList/AddItemForm.jsx

import React from "react";
import { HStack, Input, Button } from "@chakra-ui/react";

const AddItemForm = ({ newItemName, onNewItemNameChange, onAddItem }) => {
  return (
    <HStack>
      <Input
        placeholder="Nuevo..."
        value={newItemName}
        onChange={(e) => onNewItemNameChange(e.target.value)}
      />
      <Button colorScheme="pink" onClick={onAddItem}>
        Agregar
      </Button>
    </HStack>
  );
};

export default AddItemForm;
