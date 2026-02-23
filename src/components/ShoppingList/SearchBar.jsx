// src/components/ShoppingList/SearchBar.jsx

import React from "react";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchBar = ({ searchTerm, onSearchTermChange }) => {
  const handleClear = () => {
    onSearchTermChange("");
  };

  return (
    <div className="relative flex-1">
      <Input
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="pr-10"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={handleClear}
          aria-label="Borrar búsqueda"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
