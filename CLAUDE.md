# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager
This project was originally set up with **Yarn**, but **npm** also works fine.

```bash
# Install dependencies
yarn

# Start development server
yarn dev

# Build for production
vite build

# Preview production build
yarn preview
```

## Architecture Overview

### Application Structure
This is a multi-purpose todo/list management application built with React, Vite, and **shadcn/ui** (with Tailwind CSS). The app uses a **tab-based interface** with three distinct list types:

1. **Todo List** (Lista de Tareas) - General task management with drag-and-drop reordering
2. **Celiac Shopping List** (Lista Celíaco) - Specialized shopping list with price tracking and calculations
3. **Camping List** (Lista Camping) - Simple checklist for camping items

### Key Architectural Patterns

#### State Management
- **No global state library** - Uses React's built-in `useState` and `useEffect`
- **localStorage persistence** - All lists persist data to localStorage:
  - Todo List: `localStorage.getItem("todos")`
  - Celiac Shopping List: `localStorage.getItem("celiacItems")`
  - Camping List: No persistence (resets on reload)

#### Component Organization
```
src/
├── App.jsx                    # Root component with theme toggle
├── main.jsx                   # React entry point with ThemeProvider and Toaster
├── index.css                  # Tailwind CSS imports and theme variables
├── components/
│   ├── theme-provider.jsx    # Dark mode context provider
│   ├── MenuList.jsx          # Tab navigation container (coordinates all 3 lists)
│   ├── TodoList.jsx          # Drag-and-drop task list
│   ├── AddTodo.jsx           # Todo input form
│   ├── CampingList.jsx       # Simple camping checklist
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   ├── checkbox.jsx
│   │   ├── tabs.jsx
│   │   ├── alert-dialog.jsx
│   │   ├── card.jsx
│   │   └── table.jsx
│   └── ShoppingList/         # Modular shopping list components
│       ├── CeliacShoppingList.jsx  # Main shopping list container
│       ├── AddItemForm.jsx
│       ├── SearchBar.jsx
│       ├── ShoppingTable.jsx
│       ├── ShoppingRow.jsx
│       └── TotalDisplay.jsx
├── hooks/
│   └── useCeliacShoppingList.js   # Custom hook containing all shopping list logic
├── data/
│   ├── celiacItems.js        # Default shopping items with maxQuantity limits
│   └── campingItems.js       # Default camping items
├── lib/
│   └── utils.js              # cn() helper for merging Tailwind classes
└── utils/
    ├── shoppingListHelpers.js     # Price calculations, sorting, formatting
    └── formatCurrency.js
```

#### Custom Hooks Pattern
The **Celiac Shopping List** uses a custom hook pattern (`useCeliacShoppingList.js`) that encapsulates:
- State management (items, search, filtering)
- localStorage synchronization
- Business logic (price calculations, quantity limits, item toggling)
- Handler functions returned via `handlers` object

This pattern keeps `CeliacShoppingList.jsx` purely presentational while the hook manages all complexity.

#### Component Splitting Strategy
The Celiac Shopping List was recently **refactored into atomic components** (see commit `bffb0c2`):
- Each component has a single responsibility
- Data flows down through props
- Event handlers bubble up through callbacks
- This improves testability and maintainability

### Data Flow

#### Todo List (App.jsx → MenuList.jsx → TodoList.jsx)
- State lives in `App.jsx`
- Props drill down through `MenuList.jsx` to `TodoList.jsx` and `AddTodo.jsx`
- Drag-and-drop uses `useRef` hooks to track drag state
- Uses `nanoid` for unique IDs

#### Celiac Shopping List (Custom Hook Pattern)
- `useCeliacShoppingList` hook manages all state and logic
- Returns `{ items, filteredItems, searchTerm, newItemName, isOpen, total, handlers }`
- Components receive only what they need via props
- Price input uses focus/blur handlers for formatting (clears "0.00" on focus, formats on blur)

### Special Features

#### Drag-and-Drop (TodoList.jsx)
Uses HTML5 drag API with refs (not a library):
- `dragItem.current` stores dragged todo ID
- `dragOverItem.current` stores drop target ID
- `handleDragSort()` swaps items on drop

#### Price Management (Celiac Shopping List)
- Prices stored as strings to preserve decimal formatting
- `handlePriceFocus`: Clears "0.00" placeholder on focus
- `handlePriceBlur`: Formats to 2 decimals using `formatPrice()`
- Total calculated only for `completed` items

#### Item Filtering Logic
Celiac Shopping List uses a **two-stage sort**:
1. Completed items first (checked items appear at top)
2. Alphabetical within each group

### Styling Approach
- **shadcn/ui** with **Tailwind CSS** for all components and styling
- Responsive design using Tailwind's responsive classes: `md:`, `lg:`, etc.
- Dark mode support via custom `ThemeProvider` component with localStorage persistence
- Theme key: `localStorage.getItem("todo-app-theme")`
- Toast notifications using **Sonner** (instead of Chakra's useToast)
- Uses `lucide-react` for icons (instead of react-icons)
- CSS variables defined in `index.css` for theme colors

### Mobile-Specific Improvements
- **Price inputs** use `type="text"` with `inputMode="decimal"` (not `type="number"`)
  - This fixes mobile keyboard issues where type="number" causes awkward cursor behavior
  - Validation is handled manually with regex: `/^\d*\.?\d{0,2}$/`
  - Better UX on mobile: clearer text, no browser spinner controls
- Fixed bottom bar for totals uses `backdrop-blur` and proper z-indexing
- Responsive padding that adapts to mobile screens

### Important Implementation Details

#### localStorage Keys
When working with persistence:
- `todos` - Todo list items
- `celiacItems` - Shopping list with prices/quantities

#### Adding New List Types
To add a new list type:
1. Create component in `src/components/`
2. Add data file in `src/data/` (optional)
3. Register in `MenuList.jsx` tabs
4. Add localStorage key if persistence needed

#### Working with Shopping Lists
The Celiac Shopping List has **quantity limits** defined in data:
- Each item has optional `maxQuantity` property
- Increment respects these limits (see `handleQuantityChange` in hook)
- New items default to `maxQuantity: 10`

## Project Context

This is a Spanish-language application ("Lista de Tareas", "Lista Celíaco", etc.). Keep this context when adding features or messages.
