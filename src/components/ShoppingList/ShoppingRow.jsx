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
      <Td p={1}>
        <Checkbox
          size="sm"
          isChecked={item.completed}
          onChange={() => onToggle(item.id)}
        />
      </Td>
      <Td >
        <Text fontSize="xs" fontWeight={item.completed ? "bold" : "normal"}>
          {item.name}
        </Text>
      </Td>
      <Td isNumeric p={1}>
        <HStack spacing={1} justify="flex-end">
          <IconButton
            size="xs"
            aria-label="Decrementar cantidad"
            icon={<MinusIcon boxSize={3} />}
            onClick={() => onDecrement(item.id)}
            isDisabled={!item.completed}
          />
          <Text width="16px" fontSize="sm" textAlign="center">
            {item.quantity}
          </Text>
          <IconButton
            size="xs"
            aria-label="Incrementar cantidad"
            icon={<AddIcon boxSize={3} />}
            onClick={() => onIncrement(item.id)}
            isDisabled={!item.completed}
          />
        </HStack>
      </Td>
      <Td isNumeric p={1}>
        <Input
          textAlign="right"
          width="60px"
          size="xs"
          fontSize="sm"
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
