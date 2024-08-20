import React, { useState } from "react";
import {
  VStack,
  HStack,
  Text,
  Checkbox,
  Input,
  Divider,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import celiacItems from "../data/celiacItems";
import { nanoid } from "nanoid";

const CeliacShoppingList = () => {
  const [items, setItems] = useState(celiacItems);
  const [newItemName, setNewItemName] = useState("");
  const toast = useToast();

  const handleToggle = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleQuantityChange = (id, value) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(Number(value), item.maxQuantity) }
          : item
      )
    );
  };

  const handlePriceChange = (id, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, price: value } : item))
    );
  };

  const handlePriceBlur = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, price: parseFloat(item.price).toFixed(2) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return items
      .reduce((acc, item) => {
        if (item.completed && item.quantity && item.price) {
          return acc + item.quantity * parseFloat(item.price);
        }
        return acc;
      }, 0)
      .toFixed(2);
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
      quantity: 1,
      price: "0.00",
      maxQuantity: 10,
    };
    setItems([newItem, ...items]);
    setNewItemName(""); // Limpia el input después de agregar el ítem
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
          placeholder="Ingrese el nombre del ítem"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <Button colorScheme="pink" onClick={handleAddItem}>
          Agregar
        </Button>
      </HStack>

      {items.map((item) => (
        <Box key={item.id} p={2} borderWidth="1px" borderRadius="md">
          <HStack justifyContent="space-between" alignItems="center">
            <Checkbox
              isChecked={item.completed}
              onChange={() => handleToggle(item.id)}
            />
            <VStack align="start" spacing={1}>
              <Text fontWeight={item.completed ? "bold" : "normal"}>
                {item.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Cantidad:{" "}
                <Input
                  type="number"
                  min="1"
                  max={item.maxQuantity}
                  value={item.quantity || ""}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  isDisabled={!item.completed}
                  size="sm"
                  w="60px"
                  placeholder={item.maxQuantity}
                  _placeholder={{ color: "gray.400" }}
                />
              </Text>
            </VStack>
            <VStack align="end" spacing={1}>
              <Text fontWeight={item.completed ? "bold" : "normal"}>
                Precio:{" "}
                <Input
                  type="number"
                  step="0.01"
                  value={item.price || ""}
                  onChange={(e) => handlePriceChange(item.id, e.target.value)}
                  onBlur={() => handlePriceBlur(item.id)}
                  isDisabled={!item.completed}
                  size="sm"
                  w="80px"
                  placeholder="$0.00"
                  _placeholder={{ color: "gray.400" }}
                />
              </Text>
            </VStack>
          </HStack>
          <Divider mt={2} />
        </Box>
      ))}

      <HStack w="100%" justify="flex-end" p={4}>
        <Text fontWeight="bold">Total:</Text>
        <Text>${calculateTotal()}</Text>
      </HStack>
    </VStack>
  );
};

export default CeliacShoppingList;
