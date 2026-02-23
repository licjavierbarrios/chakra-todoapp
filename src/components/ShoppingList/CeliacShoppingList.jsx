// src/components/ShoppingList/CeliacShoppingList.jsx
import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import useCeliacShoppingList from "../../hooks/useCeliacShoppingList";
import SearchBar from "./SearchBar";
import AddItemForm from "./AddItemForm";
import ShoppingTable from "./ShoppingTable";
import TotalDisplay from "./TotalDisplay";

const CeliacShoppingList = () => {
  const { filteredItems, searchTerm, newItemName, isOpen, total, handlers } =
    useCeliacShoppingList();

  return (
    <div className="flex flex-col gap-4 w-full pb-[140px] md:pb-32">
      <div className="flex flex-col md:flex-row gap-2 w-full">
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={handlers.setSearchTerm}
        />
        <AddItemForm
          newItemName={newItemName}
          onNewItemNameChange={handlers.setNewItemName}
          onAddItem={handlers.handleAddItem}
        />
      </div>

      <div className="w-full overflow-x-auto border rounded-md mb-4">
        <ShoppingTable
          items={filteredItems}
          onToggle={handlers.handleToggle}
          onIncrement={(id) => handlers.handleQuantityChange(id, "increment")}
          onDecrement={(id) => handlers.handleQuantityChange(id, "decrement")}
          onPriceFocus={handlers.handlePriceFocus}
          onPriceChange={handlers.handlePriceChange}
          onPriceBlur={handlers.handlePriceBlur}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t shadow-lg z-50">
        <div className="max-w-6xl mx-auto flex flex-col items-center py-2 md:py-4 px-4 gap-2 md:gap-3">
          <TotalDisplay total={total} />
          <Button
            variant="ghost"
            size="sm"
            onClick={handlers.showConfirmDialog}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Reiniciar lista
          </Button>
        </div>
      </div>

      <AlertDialog open={isOpen} onOpenChange={handlers.closeConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reiniciar Lista</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro? Se perderán todos los cambios realizados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handlers.handleResetList} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Reiniciar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CeliacShoppingList;
