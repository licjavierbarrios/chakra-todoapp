// src/components/ShoppingList/CeliacShoppingList.jsx

import React, { useState } from "react";
import { VStack, HStack, Box, Stack, useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";

import celiacItemsData from "../../data/celiacItems";

// Importamos los componentes hijos que residen en la misma carpeta
import SearchBar from "./SearchBar";
import AddItemForm from "./AddItemForm";
import ShoppingTable from "./ShoppingTable";
import TotalDisplay from "./TotalDisplay";

const CeliacShoppingList = () => {
  const toast = useToast();

  // Ordenamos la lista alfabéticamente
  const sortedItems = [...celiacItemsData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Estado inicial: cada ítem con 'completed=false', 'price="0.00"' y 'quantity=1'
  const [items, setItems] = useState(() =>
    sortedItems.map((item) => ({
      ...item,
      completed: false,
      price: "0.00",
      quantity: 1,
    }))
  );

  // Estados para búsqueda y nuevo ítem
  const [searchTerm, setSearchTerm] = useState("");
  const [newItemName, setNewItemName] = useState("");

  // Filtrar ítems según el término de búsqueda
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Handlers principales ---

  // Cambiar el estado 'completed'
  const handleToggle = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Incrementar la cantidad, respetando 'maxQuantity' si existe
  const handleIncrement = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.maxQuantity !== undefined) {
            return {
              ...item,
              quantity:
                item.quantity < item.maxQuantity
                  ? item.quantity + 1
                  : item.quantity,
            };
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Decrementar la cantidad, sin bajar de 1
  const handleDecrement = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          };
        }
        return item;
      })
    );
  };

  // Manejo del precio: focus, change, blur
  const handlePriceFocus = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.price === "0.00") {
          return { ...item, price: "" };
        }
        return item;
      })
    );
  };

  const handlePriceChange = (id, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: value } : item))
    );
  };

  const handlePriceBlur = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const rawVal = item.price.trim();
          // Si quedó vacío, vuelve a "0.00"
          if (!rawVal) {
            return { ...item, price: "0.00" };
          }
          // Si no está vacío, parseamos con 2 decimales
          const parsed = parseFloat(rawVal || "0").toFixed(2);
          return { ...item, price: parsed };
        }
        return item;
      })
    );
  };

  // Calcular el total de la compra
  const calculateTotal = () => {
    return items
      .reduce((acc, item) => {
        if (item.completed && item.quantity && item.price) {
          return acc + item.quantity * parseFloat(item.price);
        }
        return acc;
      }, 0)
      .toFixed(2);
  };

  // Agregar un nuevo ítem
  const handleAddItem = () => {
    if (newItemName.length < 3) {
      toast({
        title: "Nombre inválido.",
        description: "El nombre del ítem debe tener al menos 3 caracteres.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newItem = {
      id: nanoid(),
      name: newItemName,
      completed: false,
      quantity: 1,
      price: "0.00",
      maxQuantity: 10,
    };

    setItems((prev) => [newItem, ...prev]);
    setNewItemName("");
    toast({
      title: "Item agregado.",
      description: `Se ha agregado "${newItemName}" a la lista.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Stack spacing={2} direction="column">
        {/* Barra de búsqueda */}
        <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

        {/* Form para agregar un nuevo ítem */}
        <AddItemForm
          newItemName={newItemName}
          onNewItemNameChange={setNewItemName}
          onAddItem={handleAddItem}
        />
      </Stack>

      {/* Tabla con los items filtrados */}
      <Box borderWidth="1px" borderRadius="md" p={2}>
        <ShoppingTable
          items={filteredItems}
          onToggle={handleToggle}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onPriceFocus={handlePriceFocus}
          onPriceChange={handlePriceChange}
          onPriceBlur={handlePriceBlur}
        />
      </Box>

      {/* Total */}
      <HStack w="100%" justify="flex-end" p={4}>
        <TotalDisplay total={calculateTotal()} />
      </HStack>
    </VStack>
  );
};

export default CeliacShoppingList;
