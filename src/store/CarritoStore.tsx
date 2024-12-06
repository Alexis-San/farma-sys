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

// Cargar el carrito inicial desde localStorage
const loadCartFromLocalStorage = (): Product[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Crear la tienda del carrito
const CarritoStore = new Store<CarritoState>({
  cart: loadCartFromLocalStorage(), // Usar los datos de localStorage si existen
});

// Suscribirse a los cambios y guardar en localStorage
CarritoStore.subscribe(
  (s) => s.cart,
  (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
);

export default CarritoStore;

// Método para agregar al carrito
export const addToCart = (passedProduct: Product): boolean => {
  if (passedProduct.stock <= 0) {
    console.error(`No hay suficiente stock para ${passedProduct.title}`);
    return false;
  }

  const existingProduct = CarritoStore.getRawState().cart.find(
    (product) => product.id === passedProduct.id
  );

  if (existingProduct) {
    if (existingProduct.quantity < passedProduct.stock) {
      CarritoStore.update((s) => {
        const product = s.cart.find((p) => p.id === passedProduct.id);
        if (product) {
          product.quantity += 1;
          product.stock -= 1; // Reducir el stock disponible
        }
      });
      return true;
    } else {
      console.error(`No hay suficiente stock para agregar más de ${passedProduct.title}`);
      return false;
    }
  } else {
    CarritoStore.update((s) => {
      s.cart.push({
        ...passedProduct,
        quantity: 1,
        stock: passedProduct.stock - 1,
      });
    });
    return true;
  }
};

// Método para eliminar del carrito
export const removeFromCart = (productId: number) => {
  CarritoStore.update((s) => {
    s.cart = s.cart.filter((product) => product.id !== productId);
  });
};
