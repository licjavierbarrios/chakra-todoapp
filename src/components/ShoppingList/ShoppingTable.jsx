// src/components/ShoppingList/ShoppingTable.jsx

import React from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import ShoppingRow from "./ShoppingRow";

const ShoppingTable = ({
  items,
  onToggle,
  onIncrement,
  onDecrement,
  onPriceFocus,
  onPriceChange,
  onPriceBlur,
}) => {
  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>✓</Th>
          <Th>Item</Th>
          <Th isNumeric>Cant.</Th>
          <Th isNumeric>Precio</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
          <ShoppingRow
            key={item.id}
            item={item}
            onToggle={onToggle}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onPriceFocus={onPriceFocus}
            onPriceChange={onPriceChange}
            onPriceBlur={onPriceBlur}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default ShoppingTable;
