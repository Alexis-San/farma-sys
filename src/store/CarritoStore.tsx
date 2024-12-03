import { Store } from "pullstate";

// Tipo del producto
export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number; // Cantidad en el carrito
  stock: number; // Cantidad disponible en el inventario
}

// Estado inicial del carrito
interface CarritoState {
  cart: Product[];
}

// Creamos la tienda del carrito
const CarritoStore = new Store<CarritoState>({
  cart: [],
});

export default CarritoStore;

// Método para agregar al carrito
export const addToCart = (passedProduct: Product): boolean => {
  // Primero verificamos si hay suficiente stock
  if (passedProduct.stock <= 0) {
    console.error(`No hay suficiente stock para ${passedProduct.title}`);
    return false; // No se puede agregar si no hay stock
  }

  // Verificamos si el producto ya está en el carrito
  const existingProduct = CarritoStore.getRawState().cart.find(
    (product) => product.id === passedProduct.id
  );

  if (existingProduct) {
    // Si el producto ya está en el carrito, comprobamos el stock
    if (existingProduct.quantity < passedProduct.stock) {
      // Si hay stock suficiente, aumentamos la cantidad
      CarritoStore.update((s) => {
        // existingProduct.quantity += 1;
      });
      //passedProduct.stock -= 1; // Reducir stock
      return true; // Producto agregado correctamente
    } else {
      console.error(
        `No hay suficiente stock para agregar más de ${passedProduct.title}`
      );
      return false; // No hay suficiente stock para añadir más
    }
  } else {
    // Si el producto no está en el carrito, lo agregamos con cantidad 1
    CarritoStore.update((s) => {
      s.cart.push({
        ...passedProduct,
        quantity: 1,
        stock: passedProduct.stock - 1,
      });
    });
    return true; // Producto agregado correctamente
  }
};

export const removeFromCart = (productId: number) => {
  CarritoStore.update((s) => {
    s.cart = s.cart.filter((product) => product.id !== productId);
  });
};
