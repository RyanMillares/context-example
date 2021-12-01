/* TODO: Create the ItemContext and useItems() function */
import { createContext, useContext } from "react";

export const ItemContext = createContext({
    items: {},
    setItems: () => {}
});

export function useItems() {
    return useContext(ItemContext)
}

