import React from "react";
import axios from "axios";
import { debounce } from "lodash"; // Asegúrate de instalar lodash
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
  IonModal,
} from "@ionic/react";
import { useStoreState } from "pullstate";
import { useEffect, useState } from "react";
import { CarritoStore } from "../store";
import styles from "../sccs/CarritoProducto.module.scss";
import PDFGenerator from "../components/PDFGenerator";
import AgregarClienteForm from "../components/AgregarClienteForm";
import { ClientesType } from "../types/ClientesType";

const API_CLIENTES = "http://localhost:8000/api/clientes/buscar";

const Carrito: React.FC = () => {
  const cart = useStoreState(CarritoStore, (s) => s.cart);
  const [amount, setAmount] = useState<string>("0");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [CI, setCI] = useState<string>("");
  const [clientesSugeridos, setClientesSugeridos] = useState<any[]>([]);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [data, setData] = useState<ClientesType[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar clientes con debounce
  const buscarClientes = debounce(async (nombre: string) => {
    try {
      const response = await axios.get(`${API_CLIENTES}?nombre=${nombre}`);
      setClientesSugeridos(response.data.clientes || []);
    } catch (error) {
      console.error("Error buscando clientes:", error);
      setClientesSugeridos([]);
    }
  }, 300);

  // Calcular el total del carrito
  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0.0;
      cart.forEach((product) => {
        total += (product.price || 0) * (product.quantity || 0);
      });
      setAmount(total.toFixed(2));
    } else {
      setAmount("0");
    }
  }, [cart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_CLIENTES);
        console.log("Datos obtenidos:", response.data);
        setData(response.data.clientes); // Asegúrate de usar la clave correcta
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (value: string) => {
    setCustomerName(value);
    if (value.trim().length > 2) {
      buscarClientes(value.trim());
    } else {
      setClientesSugeridos([]);
    }
  };

  const handleClienteSeleccionado = (cliente: any) => {
    setCustomerName(`${cliente.nombre} ${cliente.apellido}`);
    setClientesSugeridos([]);
  };

  const incrementQuantity = (productId: number) => {
    CarritoStore.update((s) => {
      const product = s.cart.find((p) => Number(p.id) === productId); // Convert 'p.id' to a number
      if (product) {
        product.quantity += 1;
      }
    });
  };

  const decrementQuantity = (productId: number) => {
    CarritoStore.update((s) => {
      const product = s.cart.find((p) => Number(p.id) === productId); // Convert 'p.id' to a number
      if (product && product.quantity > 1) {
        product.quantity -= 1;
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
      alert("El carrito está vacío, agrega productos antes de comprar.");
      return;
    }
    setIsConfirmed(true);
    

    // Aquí puedes agregar lógica adicional, como enviar datos al backend.

    
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
            <IonCol sizeMd="8" sizeSm="12">
              <IonCard>
                <IonCardContent>
                  <h1>Mi lista de productos</h1>
                  {cart.length > 0 ? (
                    cart.map((product) => (
                      <IonRow key={product.id} className={styles.productRow}>
                        <IonCol>{product.title}</IonCol>
                        <IonCol>₡ {product.price}</IonCol>
                        <IonCol>
                          <div className={styles.quantityControl}>
                            <IonButton onClick={() => decrementQuantity(product.id)}>-</IonButton>
                            <span>{product.quantity}</span>
                            <IonButton onClick={() => incrementQuantity(product.id)}>+</IonButton>
                          </div>
                        </IonCol>
                      </IonRow>
                    ))
                  ) : (
                    <div>
                      <img
                        src="/Carrito.png"
                        alt="no cart"
                        className={styles.cartImage}
                      />
                      <p>Tu carrito está vacío</p>
                      <IonButton expand="block" fill="outline" routerLink="/menu/Inicio">
                        Ver Productos
                      </IonButton>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol sizeMd="4" sizeSm="12">
              <IonCard>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="stacked">Nombre del cliente</IonLabel>
                    <IonInput
                      value={customerName}
                      onIonChange={(e) => handleInputChange(e.detail.value!)}
                      placeholder="Ingresa el nombre"
                      clearInput
                    ></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">CI o RUC</IonLabel>
                    <IonInput
                      value={CI}
                      onIonChange={(e) => setCI(e.detail.value!)}
                      placeholder="Ingresa el CI o RUC"
                      clearInput
                    // Aquí puedes agregar una lógica similar para manejar el CI o RUC
                    ></IonInput>
                  </IonItem>

                  {clientesSugeridos.length > 0 && (
                    <IonCard>
                      <IonCardContent>
                        <IonText>Clientes sugeridos:</IonText>
                        {clientesSugeridos.map((cliente: any) => (
                          <IonItem
                            key={cliente.id}
                            button
                            onClick={() => handleClienteSeleccionado(cliente)}
                          >
                            {cliente.nombre} {cliente.apellido} - {cliente.ci}
                          </IonItem>
                        ))}
                      </IonCardContent>
                    </IonCard>
                  )}

                  {/* Botón "Agregar Cliente" siempre visible */}
                  <div style={{ position: "sticky", bottom: "10px", zIndex: 10 }}>
                    {/* Botón y Modal para agregar cliente */}
                    <IonButton expand="block" color="primary" onClick={() => setMostrarModalAgregar(true)}>
                      Agregar nuevo cliente
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardContent>
                  <h1>Resumen del carrito</h1>
                  <h3>Total: {amount} Gs.</h3>

                  <IonButton
                    expand="block"
                    color="tertiary"
                    className={styles.buyNow}
                    onClick={handleBuyNow}
                  >
                    Comprar Ya
                  </IonButton>

                  <PDFGenerator cart={cart} customerName={customerName} CI={CI} />

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

        <IonModal
          isOpen={mostrarModalAgregar}
          onDidDismiss={() => setMostrarModalAgregar(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Agregar Cliente</IonTitle>
              <IonButton slot="end" onClick={() => setMostrarModalAgregar(false)}>
                Cerrar
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {/* Aquí puedes insertar el formulario para agregar cliente */}
            <IonModal isOpen={mostrarModalAgregar} onDidDismiss={() => setMostrarModalAgregar(false)}>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Agregar Cliente</IonTitle>
                  <IonButton slot="end" onClick={() => setMostrarModalAgregar(false)}>
                    Cerrar
                  </IonButton>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <AgregarClienteForm
            onGuardarCliente={async (nuevoCliente) => {
              try {
                const response = await axios.post(API_CLIENTES, nuevoCliente);
                setData([...data, response.data]);
                setMostrarModalAgregar(false);
                console.log("Cliente agregado exitosamente:", response.data);
              } catch (error) {
                console.error("Error al agregar el cliente:", error);
              }
            }}
                />
              </IonContent>
            </IonModal>
          </IonContent>
        </IonModal>

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

