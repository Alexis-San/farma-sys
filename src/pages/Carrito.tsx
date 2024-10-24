import { IonButton,IonButtons,IonBackButton,IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useStoreState } from 'pullstate';
import { useEffect, useState } from 'react';
import { CartProduct } from '../components/CarritoProducto';
import { Heading } from '../components/Heading';
import { CarritoStore } from '../store'; // Asegúrate de que sea el default export aquí.
import styles from "../sccs/CarritoProducto.module.scss";

// Define the types for the products in the cart
interface Product {
  price: number;
  [key: string]: any; // Usa propiedades específicas si son conocidas
}

const Carrito: React.FC = () => {
  // Cambiado para obtener directamente el array de productos del estado del carrito
  const cart = useStoreState(CarritoStore, s => s.cart);
  const [amount, setAmount] = useState<string>('0.00');

  useEffect(() => {
    let total = 0.0;
    cart.forEach((product) => (total += product.price));
    setAmount(total.toFixed(2));
  }, [cart]);

  return (
    <IonPage>

      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle className={styles.contenedortcarrito}>Carrito</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonGrid>
  {cart.length < 1 && (
    <IonRow className="emptyCartContainer">
      <IonCol size="12" className="ion-text-center">
        <div className={styles.emptyCartText}>
          <img src="../public/Carrito.png" alt="no cart" className={styles.cartImage} />
          <h2>Espera aqui</h2>
          <p>Tu Carrito está vacío</p>
          <IonButton color="primary" shape="round" className={styles.bottom} routerLink="/menu/Inicio">
            Vender &rarr;
          </IonButton>
        </div>
      </IonCol>
    </IonRow>
  )}

  {cart.length > 0 && (
    <>
      <IonRow className="emptyCartContainer">
        <IonCol size="12">
          <Heading heading={`You have ${cart.length} products in your cart. Your total comes to £${amount}.`} />
        </IonCol>
      </IonRow>

      <IonRow>
        {cart.map((product, index) => (
          <CartProduct product={product} key={index} />
        ))}
      </IonRow>
    </>
  )}
</IonGrid>


        {cart.length > 0 && (
          <IonGrid className="bottom">
            <IonRow>
              <IonCol size="12">
                <IonButton color="primary" expand="block">
                  Checkout (£{amount})
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Carrito;


