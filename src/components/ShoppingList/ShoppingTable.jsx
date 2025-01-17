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
    <Table variant="simple" size="sm" width="100%" tableLayout="fixed">
      <Thead>
        <Tr>
          <Th width="5%" textAlign="center" p={1}>
            ✓
          </Th>
          <Th width="45%" p={1}>
            Item
          </Th>
          <Th width="20%" isNumeric p={1}>
            Cant.
          </Th>
          <Th width="20%" isNumeric p={1}>
            Precio
          </Th>
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
