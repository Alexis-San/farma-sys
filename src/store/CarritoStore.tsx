import { Store } from "pullstate";

// Definimos el tipo de producto para el carrito (ajústalo según los atributos de tu producto)
interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
}

// Definimos el tipo del estado del carrito
interface CarritoState {
    cart: Product[];
}

const CarritoStore = new Store<CarritoState>({
    cart: []
});

export default CarritoStore;

// Definimos el tipo de la función addToCart
export const addToCart = (passedProduct: Product): boolean => {
    const currentCart = CarritoStore.getRawState().cart;
    const added = !currentCart.includes(passedProduct);

    CarritoStore.update(s => {
        if (currentCart.includes(passedProduct)) {
            s.cart = currentCart.filter(product => product !== passedProduct);
        } else {
            s.cart = [...s.cart, passedProduct];
        }
    });

    return added;
};
