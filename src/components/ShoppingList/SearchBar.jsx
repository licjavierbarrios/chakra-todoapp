// src/components/ShoppingList/SearchBar.jsx

import React from "react";
import {
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
  );
};

export default SearchBar;
