// src/components/ShoppingList/TotalDisplay.jsx

import React from "react";
import { HStack, Text } from "@chakra-ui/react";

const TotalDisplay = ({ total }) => {
  return (
    <HStack spacing={2}>
      <Text fontWeight="bold">Total:</Text>
      <Text>${total}</Text>
    </HStack>
  );
};

export default TotalDisplay;
