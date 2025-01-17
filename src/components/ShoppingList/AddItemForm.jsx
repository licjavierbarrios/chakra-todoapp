// src/components/ShoppingList/AddItemForm.jsx

import React from "react";
import { Box, HStack, Input, Button } from "@chakra-ui/react";

const AddItemForm = ({ newItemName, onNewItemNameChange, onAddItem }) => {
  return (
    <Box w="100%" px={{ base: 2, md: 8 }}>
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
    </Box>
  );
};

export default AddItemForm;
