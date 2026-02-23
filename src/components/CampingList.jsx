import React, { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import campingItems from "../data/campingItems";
import { nanoid } from "nanoid";

const CampingList = () => {
  const [items, setItems] = useState(campingItems);
  const [newItemName, setNewItemName] = useState("");

  const toggleItemCompletion = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddItem = () => {
    if (newItemName.length < 3) {
      toast.error("El nombre del ítem debe tener al menos 3 caracteres.");
      return;
    }

    const newItem = {
      id: nanoid(),
      name: newItemName,
      completed: false,
    };
    setItems([newItem, ...items]);
    setNewItemName("");
    toast.success(`"${newItemName}" fue agregado a la lista`);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Nombre del ítem"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddItem}>
          Agregar
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => toggleItemCompletion(item.id)}
              />
              <span className={item.completed ? "font-bold" : "font-normal"}>
                {item.name}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampingList;
