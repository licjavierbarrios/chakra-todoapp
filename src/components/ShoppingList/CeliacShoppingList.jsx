// src/components/ShoppingList/CeliacShoppingList.jsx
import React from "react";
import {
  VStack,
  HStack,
  Box,
  Stack,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import useCeliacShoppingList from "../../hooks/useCeliacShoppingList";
import SearchBar from "./SearchBar";
import AddItemForm from "./AddItemForm";
import ShoppingTable from "./ShoppingTable";
import TotalDisplay from "./TotalDisplay";

const CeliacShoppingList = () => {
  const { filteredItems, searchTerm, newItemName, isOpen, total, handlers } =
    useCeliacShoppingList();

  
  const cancelRef = React.useRef();

  return (
    <VStack
      spacing={4}
      align="stretch"
      w="100%"
      h="100vh"
      px={{ base: 4, md: 8 }}
      overflowY="auto"
    >
      <Stack spacing={2} direction={{ base: "column", md: "row" }} w="100%">
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={handlers.setSearchTerm}
        />
        <AddItemForm
          newItemName={newItemName}
          onNewItemNameChange={handlers.setNewItemName}
          onAddItem={handlers.handleAddItem}
        />
      </Stack>

      <Box
        w="100%"
        maxW="100vw"
        overflowX="auto"
        borderWidth="1px"
        borderRadius="md"
        p={2}
      >
        <ShoppingTable
          items={filteredItems}
          onToggle={handlers.handleToggle}
          onIncrement={(id) => handlers.handleQuantityChange(id, "increment")}
          onDecrement={(id) => handlers.handleQuantityChange(id, "decrement")}
          onPriceFocus={handlers.handlePriceFocus}
          onPriceChange={handlers.handlePriceChange}
          onPriceBlur={handlers.handlePriceBlur}
        />
      </Box>

      <Box
        w="80%"
        bg="white"
        position="fixed"
        bottom="0"
        boxShadow="md"
        zIndex="10"
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={2}
      >
        <TotalDisplay total={total} />
        <Button
          variant="ghost"
          colorScheme="red"
          size="sm"
          leftIcon={<DeleteIcon />}
          onClick={handlers.showConfirmDialog}
          mt={1}
        >
          Reiniciar lista
        </Button>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handlers.closeConfirmDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reiniciar Lista
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro? Se perderán todos los cambios realizados.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handlers.closeConfirmDialog}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={handlers.handleResetList}
                ml={3}
              >
                Reiniciar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default CeliacShoppingList;
