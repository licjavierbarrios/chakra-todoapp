// src/components/ShoppingList/TotalDisplay.jsx

import React from "react";
import formatCurrency from "../../utils/formatCurrency";

const BUDGET = 55000;

const TotalDisplay = ({ total }) => {
  const remaining = BUDGET - parseFloat(total);
  const isOverBudget = remaining < 0;

  return (
    <>
      {/* Vista móvil - compacta */}
      <div className="flex md:hidden items-center justify-center gap-3 w-full">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium">Total:</span>
          <span className="text-base font-bold">{formatCurrency(total)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-xs ${isOverBudget ? 'text-destructive' : 'text-green-600 dark:text-green-400'}`}>
            {isOverBudget ? 'Excedido:' : 'Restan:'}
          </span>
          <span className={`text-sm font-semibold ${isOverBudget ? 'text-destructive' : 'text-green-600 dark:text-green-400'}`}>
            {formatCurrency(Math.abs(remaining))}
          </span>
        </div>
      </div>

      {/* Vista desktop - detallada */}
      <div className="hidden md:flex items-center justify-center gap-6 w-full">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Total:</span>
          <span className="text-lg font-bold">{formatCurrency(total)}</span>
        </div>

        <div className="h-8 w-px bg-border"></div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Presupuesto:</span>
          <span className="text-sm font-semibold">{formatCurrency(BUDGET)}</span>
        </div>

        <div className="h-8 w-px bg-border"></div>

        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isOverBudget ? 'text-destructive' : 'text-green-600 dark:text-green-400'}`}>
            {isOverBudget ? 'Excedido:' : 'Disponible:'}
          </span>
          <span className={`text-lg font-bold ${isOverBudget ? 'text-destructive' : 'text-green-600 dark:text-green-400'}`}>
            {formatCurrency(Math.abs(remaining))}
          </span>
        </div>
      </div>
    </>
  );
};

export default TotalDisplay;
