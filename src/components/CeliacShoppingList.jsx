import React, { useState } from "react";
import {
  VStack,
  HStack,
  Text,
  Checkbox,
  Input,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Thead,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import celiacItems from "../data/celiacItems";

const CeliacShoppingList = () => {
  const [items, setItems] = useState(celiacItems);

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

  return (
    <VStack>
      <TableContainer w="100%" overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead display={{ base: "none", md: "table-header-group" }}>
            <Tr>
              <Th>Comprar</Th>
              <Th>Item</Th>
              <Th isNumeric>Cantidad</Th>
              <Th isNumeric>Precio (ARS)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr
                key={item.id}
                display={{ base: "flex", md: "table-row" }}
                flexDirection={{ base: "column", md: "row" }}
              >
                <Td
                  display={{ base: "flex", md: "table-cell" }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    display={{ base: "block", md: "none" }}
                    fontWeight="bold"
                  >
                    Comprar
                  </Text>
                  <Checkbox
                    isChecked={item.completed}
                    onChange={() => handleToggle(item.id)}
                  />
                </Td>
                <Td
                  display={{ base: "flex", md: "table-cell" }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    display={{ base: "block", md: "none" }}
                    fontWeight="bold"
                  >
                    Item
                  </Text>
                  <Text as={item.completed ? "s" : "span"}>{item.name}</Text>
                </Td>
                <Td
                  display={{ base: "flex", md: "table-cell" }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    display={{ base: "block", md: "none" }}
                    fontWeight="bold"
                  >
                    Cantidad
                  </Text>
                  <Input
                    type="number"
                    min="1"
                    max={item.maxQuantity}
                    value={item.quantity || ""}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    isDisabled={!item.completed}
                    w="70px"
                  />
                </Td>
                <Td
                  display={{ base: "flex", md: "table-cell" }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    display={{ base: "block", md: "none" }}
                    fontWeight="bold"
                  >
                    Precio (ARS)
                  </Text>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.price || ""}
                    onChange={(e) => handlePriceChange(item.id, e.target.value)}
                    onBlur={() => handlePriceBlur(item.id)}
                    isDisabled={!item.completed}
                    w="70px"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack w="100%" justify="flex-end" p={4}>
        <Text fontWeight="bold">Total:</Text>
        <Text>${calculateTotal()}</Text>
      </HStack>
    </VStack>
  );
};

export default CeliacShoppingList;
