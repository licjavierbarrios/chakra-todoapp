// src/utils/shoppingListHelpers.js
export const sortItemsAlphabetically = (items) => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
};

export const calculateTotalPrice = (items) => {
  return items
    .reduce((acc, item) => {
      if (item.completed && item.quantity && item.price) {
        return acc + item.quantity * parseFloat(item.price);
      }
      return acc;
    }, 0)
    .toFixed(2);
};

export const formatPrice = (price) => {
  const rawVal = price.toString().trim();
  if (!rawVal) return "0.00";
  const parsed = parseFloat(rawVal.replace(",", ".")) || 0;
  return parsed.toFixed(2);
};
