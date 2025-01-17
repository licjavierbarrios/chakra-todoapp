// src/utils/formatCurrency.js

/**
 * Formatea un número como moneda en pesos argentinos con separadores de miles.
 * @param {number|string} amount - El monto a formatear.
 * @returns {string} - El monto formateado.
 */
const formatCurrency = (amount) => {
  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount)) return "$0,00";

  return parsedAmount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default formatCurrency;
