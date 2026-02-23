// src/components/ShoppingList/useCeliacShoppingList.js
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import celiacItemsData from "../data/celiacItems";
import {
  calculateTotalPrice,
  formatPrice,
  sortItemsAlphabetically,
} from "../utils/shoppingListHelpers";

const useCeliacShoppingList = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Ordenamos los items iniciales
  const initialItems = sortItemsAlphabetically(celiacItemsData).map((item) => ({
    ...item,
    completed: false,
    price: "0.00",
    quantity: 1,
  }));

  // Estado de los items
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("celiacItems");
    return savedItems ? JSON.parse(savedItems) : initialItems;
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("celiacItems", JSON.stringify(items));
  }, [items]);

  // Estados para búsqueda y nuevo item
  const [searchTerm, setSearchTerm] = useState("");
  const [newItemName, setNewItemName] = useState("");

  // Filtrar items
  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Primero ordenar por estado completed (true primero)
      const completedComparison = Number(b.completed) - Number(a.completed);
      if (completedComparison !== 0) return completedComparison;

      // Si tienen el mismo estado, ordenar alfabéticamente
      return a.name.localeCompare(b.name);
    });

  // Limpia el nuevo ítem si hay búsqueda
  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    if (term) setNewItemName("");
  };

  // Limpia la búsqueda si hay nuevo ítem
  const handleNewItemNameChange = (name) => {
    setNewItemName(name);
    if (name) setSearchTerm("");
  };

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

  // Handlers
  const handleToggle = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleQuantityChange = (id, type) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        let newQuantity = item.quantity;
        if (type === "increment") {
          newQuantity = item.maxQuantity
            ? Math.min(item.quantity + 1, item.maxQuantity)
            : item.quantity + 1;
        } else {
          newQuantity = Math.max(item.quantity - 1, 1);
        }

        return { ...item, quantity: newQuantity };
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
        if (item.id !== id) return item;
        return { ...item, price: formatPrice(item.price) };
      })
    );
  };

  const handleAddItem = () => {
    if (newItemName.length < 3) {
      toast.error("El nombre debe tener al menos 3 caracteres");
      return;
    }

    const newItem = {
      id: nanoid(),
      name: newItemName,
      completed: true,
      quantity: 1,
      price: "0.00",
      maxQuantity: 10,
    };

    setItems((prev) => [newItem, ...prev]);
    setNewItemName("");
    toast.success(`"${newItemName}" fue añadido a la lista`);
  };

  const handleResetList = () => {
    localStorage.removeItem("celiacItems");
    setItems(initialItems);
    setIsOpen(false);
    toast.success("Lista reiniciada");
  };

  return {
    items,
    filteredItems,
    searchTerm,
    newItemName,
    isOpen,
    total: calculateTotalPrice(items),
    handlers: {
      setSearchTerm,
      setNewItemName,
      handleToggle,
      handleQuantityChange,
      handlePriceFocus,
      handlePriceChange,
      handlePriceBlur,
      handleAddItem,
      handleResetList,
      setSearchTerm: handleSearchTermChange, // Usamos la nueva función
      setNewItemName: handleNewItemNameChange, // Usamos la nueva función
      showConfirmDialog: () => setIsOpen(true),
      closeConfirmDialog: () => setIsOpen(false),
    },
  };
};

export default useCeliacShoppingList;
