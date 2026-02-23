// src/components/ShoppingList/ShoppingTable.jsx

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[5%] text-center p-2">✓</TableHead>
          <TableHead className="w-[45%] p-2">Item</TableHead>
          <TableHead className="w-[25%] text-right p-2">Cant.</TableHead>
          <TableHead className="w-[25%] text-right p-2">Precio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
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
      </TableBody>
    </Table>
  );
};

export default ShoppingTable;
