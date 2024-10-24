import { createSelector } from 'reselect';

// Define los tipos de datos que tienes en el estado global
interface Product {
  id: string | number;
  category: string;
  // otros campos del producto
}

interface Category {
  id: string | number;
  name: string;
  // otros campos de categoría
}

interface Cart {
  // Define lo que contiene el carrito
}

interface State {
  cart: Cart;
  categories: Category[];
  products: Product[];
}

// El estado global debe tener un tipo
const getState = (state: State) => state;

// General getters
export const getCart = createSelector(getState, (state: State) => state.cart);
export const getCategories = createSelector(getState, (state: State) => state.categories);
export const getProducts = createSelector(getState, (state: State) => state.products);

// Specific getters
export const getProduct = (id: string | number) =>
  createSelector(getState, (state: State) =>
    state.products.filter((p: Product) => parseInt(p.id as string) === parseInt(id as string))[0]
  );

export const getCategoryProducts = (category: string) =>
  createSelector(getState, (state: State) =>
    state.products.filter((p: Product) => p.category === category)
  );
