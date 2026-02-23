// src/components/ShoppingList/AddItemForm.jsx

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AddItemForm = ({ newItemName, onNewItemNameChange, onAddItem }) => {
  return (
    <div className="flex gap-2 flex-1">
      <Input
        placeholder="Nuevo..."
        value={newItemName}
        onChange={(e) => onNewItemNameChange(e.target.value)}
      />
      <Button onClick={onAddItem}>
        Agregar
      </Button>
    </div>
  );
};

export default AddItemForm;
