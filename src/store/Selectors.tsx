import CarritoStore from "./CarritoStore";

// Selector para contar el total de ítems en el carrito
export const selectCartItemCount = (state: { cart: { quantity: number }[] }): number =>
  state.cart.reduce((count, item) => count + item.quantity, 0);

export default { selectCartItemCount };

