// src/components/ShoppingList/SearchBar.jsx

import React from "react";
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const SearchBar = ({ searchTerm, onSearchTermChange }) => {
  const handleClear = () => {
    onSearchTermChange("");
  };

  return (
    <Box w="100%" px={{ base: 2, md: 8 }}>
      <InputGroup>
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
        {searchTerm && (
          <InputRightElement width="2.5rem">
            <IconButton
              size="sm"
              icon={<CloseIcon />}
              variant="ghost"
              onClick={handleClear}
              aria-label="Borrar búsqueda"
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
