import {
  IonButton,
  IonCard,
  IonHeader,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButtons,
  IonBackButton,
  IonAlert,
  IonText,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useStoreState } from "pullstate";
import { useEffect, useState } from "react";
import { CarritoStore } from "../store";
import styles from "../sccs/CarritoProducto.module.scss";
import PDFGenerator from "../components/PDFGenerator"; // Importa tu componente PDFGenerator

const Carrito: React.FC = () => {
  const cart = useStoreState(CarritoStore, (s) => s.cart);
  const [amount, setAmount] = useState<string>("0.00");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");

  // Calcular el total del carrito
  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0.0;
      cart.forEach((product) => (total += product.price * product.quantity));
      setAmount(total.toFixed(2));
    } else {
      setAmount("0.00");
    }
  }, [cart]);

  const updateQuantity = (productId: string, change: number) => {
    CarritoStore.update((s) => {
      const product = s.cart.find((p) => p.id === productId);
      if (product) {
        product.quantity = Math.max(1, product.quantity + change); // Evitar cantidades menores a 1
      }
    });
  };

  const clearCart = () => {
    CarritoStore.update((s) => {
      s.cart = [];
    });
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de continuar.");
      return;
    }
    if (!customerName.trim()) {
      alert("Por favor, ingresa el nombre del cliente.");
      return;
    }
    setIsConfirmed(true); // Mostrar el mensaje de confirmación
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Mi Carrito</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            {/* Lista de productos */}
            <IonCol sizeMd="8" sizeSm="12">
              <IonCard>
                <IonCardContent>
                  <h2>Mi lista de productos</h2>
                  {cart.length > 0 ? (
                    cart.map((product) => (
                      <IonRow key={product.id} className={styles.productRow}>
                        <IonCol size="4" sizeSm="3" className={styles.imageCol}>
                          <img
                            src={product.image}
                            alt={product.title}
                            className={styles.productImage}
                          />
                        </IonCol>
                        <IonCol size="5" sizeSm="6" className={styles.productInfo}>
                          <h4>{product.title}</h4>
                        </IonCol>
                        <IonCol size="3" className="ion-text-center">
                          <IonButton
                            color="secondary"
                            size="small"
                            onClick={() => updateQuantity(product.id, -1)}
                          >
                            -
                          </IonButton>
                          <IonText> {product.quantity} </IonText>
                          <IonButton
                            color="secondary"
                            size="small"
                            onClick={() => updateQuantity(product.id, 1)}
                          >
                            +
                          </IonButton>
                        </IonCol>
                        <IonCol size="3" className={styles.letrita}>
                          <p>{`₡ ${(product.price * product.quantity).toFixed(2)}`}</p>
                          <IonButton
                            fill="clear"
                            color="danger"
                            size="small"
                            onClick={() => updateQuantity(product.id, 0)}
                          >
                            🗑️
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    ))
                    
                  ) : (
                    <div>
                      <img
                        src="../public/Carrito.png"
                        alt="no cart"
                        className={styles.cartImage}
                      />
                      <p>Tu carrito está vacío</p>
                      <IonButton expand="block" fill="outline" routerLink="/menu/Inicio" >Ver Productos</IonButton>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Resumen del carrito */}
            <IonCol sizeMd="4" sizeSm="12">
              {/* Formulario de nombre del cliente */}
              <IonCard>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="stacked">Nombre del cliente</IonLabel>
                    <IonInput
                      value={customerName}
                      onIonChange={(e) => setCustomerName(e.detail.value!)}
                      placeholder="Ingresa el nombre"
                      clearInput
                    ></IonInput>
                  </IonItem>
                </IonCardContent>
              </IonCard>

              {/* Resumen */}
              <IonCard>
                <IonCardContent>
                  <h2>Resumen del carrito</h2>
                  <h3>Total: ₡ {amount}</h3>

                  <IonButton
                    expand="block"
                    color="success"
                    className={styles.buyNow}
                    onClick={handleBuyNow}
                  >
                    Comprar Ya
                  </IonButton>

                  <PDFGenerator cart={cart} customerName={customerName} CI={""} />


                  <IonButton expand="block" fill="outline" routerLink="/menu/Inicio">
                    Agregar más productos
                  </IonButton>
                  <IonButton
                    expand="block"
                    color="danger"
                    fill="outline"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* IonAlert para confirmar la compra */}
        <IonAlert
          isOpen={isConfirmed}
          onDidDismiss={() => setIsConfirmed(false)}
          header="Compra realizada"
          message={`¡Gracias por tu compra, ${customerName}! Un PDF con los detalles de tu compra ha sido generado.`}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Carrito;
