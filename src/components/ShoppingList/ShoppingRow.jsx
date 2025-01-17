// src/components/ShoppingList/ShoppingRow.jsx

import React from "react";
import {
  Tr,
  Td,
  Checkbox,
  Text,
  Input,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

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
    <Tr>
      <Td>
        <Checkbox
          isChecked={item.completed}
          onChange={() => onToggle(item.id)}
        />
      </Td>
      <Td>
        <Text fontWeight={item.completed ? "bold" : "normal"}>{item.name}</Text>
      </Td>
      <Td isNumeric>
        <HStack spacing={2} justify="flex-end">
          <IconButton
            size="xs"
            aria-label="Decrementar cantidad"
            icon={<MinusIcon />}
            onClick={() => onDecrement(item.id)}
            isDisabled={!item.completed}
          />
          <Text width="20px" textAlign="center">
            {item.quantity}
          </Text>
          <IconButton
            size="xs"
            aria-label="Incrementar cantidad"
            icon={<AddIcon />}
            onClick={() => onIncrement(item.id)}
            isDisabled={!item.completed}
          />
        </HStack>
      </Td>
      <Td isNumeric>
        <Input
          textAlign="right"
          width="80px"
          size="sm"
          type="number"
          step="0.01"
          value={item.price}
          placeholder="0.00"
          isDisabled={!item.completed}
          onFocus={() => onPriceFocus(item.id)}
          onChange={(e) => onPriceChange(item.id, e.target.value)}
          onBlur={() => onPriceBlur(item.id)}
        />
      </Td>
    </Tr>
  );
};

export default ShoppingRow;
