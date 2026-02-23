// src/components/ShoppingList/ShoppingRow.jsx

import React from "react";
import { Plus, Minus } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TableRow, TableCell } from "../ui/table";

const ShoppingRow = ({
  item,
  onToggle,
  onIncrement,
  onDecrement,
  onPriceFocus,
  onPriceChange,
  onPriceBlur,
}) => {
  return (
    <TableRow>
      <TableCell className="p-2">
        <Checkbox
          checked={item.completed}
          onCheckedChange={() => onToggle(item.id)}
        />
      </TableCell>
      <TableCell className="p-2">
        <span className={`text-sm ${item.completed ? "font-bold" : "font-normal"}`}>
          {item.name}
        </span>
      </TableCell>
      <TableCell className="p-2">
        <div className="flex items-center justify-end gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7"
            onClick={() => onDecrement(item.id)}
            disabled={!item.completed}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7"
            onClick={() => onIncrement(item.id)}
            disabled={!item.completed}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="p-2">
        <Input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*\.?[0-9]*"
          className="text-right w-20 h-8 text-sm"
          value={item.price}
          placeholder="0.00"
          disabled={!item.completed}
          onFocus={() => onPriceFocus(item.id)}
          onChange={(e) => {
            const value = e.target.value;
            // Allow only numbers and decimal point
            if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
              onPriceChange(item.id, value);
            }
          }}
          onBlur={() => onPriceBlur(item.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ShoppingRow;
