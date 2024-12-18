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
  IonIcon,
} from "@ionic/react";
import { useStoreState } from "pullstate";
import { useEffect, useState } from "react";
import CarritoStore, { removeFromCart } from "../store/CarritoStore";
import styles from "../sccs/CarritoProducto.module.scss";
import PDFGenerator from "../components/PDFGenerator";
import AgregarClienteForm from "../components/AgregarClienteForm";
import { ClientesType } from "../types/ClientesType";
import { trashOutline } from "ionicons/icons";
import { useHistory } from "react-router";

const API_CLIENTES = "http://localhost:8000/api/clientes/buscar";
const API_CLIENTES_AGREGAR = "http://localhost:8000/api/clientes";
const API_lOGIN = "http://localhost:8000/api/login/usuario";
const API_VENTAS = "http://localhost:8000/api/ventas";
const API_VENTASDETALLES = "http://localhost:8000/api/ventas/detalles";

const Carrito: React.FC = () => {
  const cart = useStoreState(CarritoStore, (s) => s.cart);
  const [amount, setAmount] = useState<string>("0");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [CI, setCI] = useState<string>("");
  const [idCliente, setIdCliente] = useState("");
  const [clientesSugeridos, setClientesSugeridos] = useState<any[]>([]);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [clientes, setClientes] = useState<ClientesType[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); // Obtén el objeto history

  // Buscar clientes con debounce
  const buscarClientes = debounce(async (nombre: string) => {
    try {
      const response = await axios.get(`${API_CLIENTES}?nombre=${nombre}`);
      setClientesSugeridos(response.data.clientes || []);
    } catch (error) {
      console.error("Error buscando clientes:", error);
      setClientesSugeridos([]);
    }
  }, 500);

  const buscarClientesPorCI = debounce(async (ci: string) => {
    try {
      const response = await axios.get(`${API_CLIENTES}?ci=${ci}`);
      setClientesSugeridos(response.data.clientes || []);
    } catch (error) {
      console.error("Error buscando clientes:", error);
      setClientesSugeridos([]);
    }
  }, 500);

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
        setClientes(response.data.clientes); // Asegúrate de usar la clave correcta
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
    setCI(cliente.ci);
    setClientesSugeridos([]);
    setIdCliente(cliente.id);
  };

  const incrementQuantity = (productId: number) => {
    CarritoStore.update((s) => {
      const product = s.cart.find((p) => Number(p.id) === productId); // Convert 'p.id' to a number

      if (product && product.stock > 0) {
        product.stock -= 1;
        product.quantity += 1;
      }
    });
  };

  const decrementQuantity = (productId: number) => {
    CarritoStore.update((s) => {
      const product = s.cart.find((p) => Number(p.id) === productId); // Convert 'p.id' to a number
      if (product && product.quantity > 1) {
        product.stock += 1;
        product.quantity -= 1;
      }
    });
  };

  const clearCart = () => {
    CarritoStore.update((s) => {
      s.cart = [];
    });
  };

  const handleBuyNow = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío, agrega productos antes de comprar.");
      return;
    }

    try {
      const usuario = await axios.get(API_lOGIN);
      let idUsuario = usuario.data.usuario.id;
      console.log("ID del usuario:", idUsuario);
      console.log("ID del cliente:", idCliente);
      // Step 1: Create main sale
      const ventaResponse = await axios.post(API_VENTAS, {
        id_cliente: idCliente,
        id_usuario: idUsuario,
      });
      console.log("Respuesta de la venta:", ventaResponse.data);
      const idVenta = ventaResponse.data.venta.id; // ID de la venta creada
      console.log("ID de la venta:", idVenta);

      // Step 2: Create sale details
      const detalles = cart.map((item) => ({
        id_producto_inventario: item.id,
        precio: item.price,
        cantidad: item.quantity,
      }));

      const ventaDetalle = {
        id_venta: idVenta,
        detalles: detalles,
      };

      // Realizar la petición POST con el objeto construido
      await axios.post(API_VENTASDETALLES, ventaDetalle);

      setIsConfirmed(true);
      // Clear cart and show success message
    } catch (error) {
      console.error("Error al procesar la venta:", error);
      alert("Error al procesar la venta");
    }
  };
  const handleDelete = (productId: number) => {
    removeFromCart(productId);
  };

  const limpiarInputs = () => {
    // Limpia los valores de los estados
    setCustomerName("");
    setCI("");

    // Limpia los valores directamente en los inputs con `clearInput`
    document
      .querySelectorAll("ion-input")
      .forEach((input: any) => (input.value = ""));
  };

  const handleAlertDismiss = async () => {
    // Redirige a las páginas deseadas y recarga si es necesario
    history.push("/menu/inicio");
    window.location.reload(); // Recarga la página si lo necesitas
  };

  const handleBackAndReload = () => {
    // Regresa hacia atrás
    history.goBack();
    // Luego recarga la página actual
    setTimeout(() => {
      window.location.reload();
    }, 50); // Un pequeño retraso para asegurarse de que la navegación haya ocurrido
  };

  //Agregar Clientes
  const abrirModalAgregar = () => {
    setMostrarModalAgregar(true);
  };

  const cerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={handleBackAndReload}>Volver</IonButton>
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
                  <IonRow
                    className="encabezado"
                    style={{
                      background: "#f0f0f0",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    <IonCol size="4">Nombre</IonCol>
                    <IonCol size="2">Precio</IonCol>
                    <IonCol size="2">Stock</IonCol>
                    <IonCol size="3">Cantidad</IonCol>
                    <IonCol size="1">Accion</IonCol>
                  </IonRow>

                  {cart.length > 0 ? (
                    cart.map((product) => (
                      <IonRow key={product.id} className={styles.productRow}>
                        <IonCol size="4">{product.title}</IonCol>
                        <IonCol size="2">₡ {product.price}</IonCol>
                        <IonCol size="2">{product.stock}</IonCol>
                        <IonCol size="3">
                          <div className={styles.quantityControl}>
                            <IonButton
                              onClick={() => decrementQuantity(product.id)}
                            >
                              -
                            </IonButton>
                            <span>{product.quantity}</span>
                            <IonButton
                              onClick={() => incrementQuantity(product.id)}
                            >
                              +
                            </IonButton>
                          </div>
                        </IonCol>

                        <IonCol size="1">
                          <IonButton
                            onClick={() => handleDelete(product.id)}
                            fill="clear"
                            color="danger"
                          >
                            <IonIcon icon={trashOutline} />
                          </IonButton>
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
                      <IonButton
                        expand="block"
                        fill="outline"
                        onClick={async () => {
                          handleAlertDismiss();
                        }}
                      >
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
                      onIonChange={(e) => {
                        const ci = e.detail.value!;
                        setCI(ci); // Actualiza el estado de CI
                        buscarClientesPorCI(ci); // Llama a la función de búsqueda por CI
                      }}
                      placeholder="Ingresa el CI o RUC"
                      clearInput
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
                  <div
                    style={{ position: "sticky", bottom: "10px", zIndex: 10 }}
                  >
                    {/* Botón y Modal para agregar cliente */}
                    <IonButton
                      expand="block"
                      color="primary"
                      onClick={() => setMostrarModalAgregar(true)}
                    >
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
                    onClick={async () => {
                      await handleBuyNow();
                      clearCart();
                      limpiarInputs(); // Llama a la función para limpiar los inputs
                    }}
                  >
                    Comprar Ya
                  </IonButton>

                  <PDFGenerator
                    cart={cart}
                    customerName={customerName}
                    CI={CI}
                  />

                  <IonButton
                    expand="block"
                    fill="outline"
                    routerLink="/menu/Inicio"
                  >
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
              <IonButton
                slot="end"
                onClick={() => setMostrarModalAgregar(false)}
              >
                Cerrar
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {/* Aquí puedes insertar el formulario para agregar cliente */}
            <IonModal
              isOpen={mostrarModalAgregar}
              onDidDismiss={() => setMostrarModalAgregar(false)}
            >
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Agregar Cliente</IonTitle>
                  <IonButton
                    slot="end"
                    onClick={() => setMostrarModalAgregar(false)}
                  >
                    Cerrar
                  </IonButton>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <AgregarClienteForm
                  onGuardarCliente={async (nuevoCliente) => {
                    try {
                      // Envía los datos a la API
                      const response = await axios.post(
                        API_CLIENTES_AGREGAR,
                        nuevoCliente
                      );

                      // Actualiza la lista de clientes
                      setClientes((prevClientes) => [
                        ...prevClientes,
                        response.data,
                      ]);

                      // Cierra el modal
                      cerrarModalAgregar();

                      console.log(
                        "Cliente agregado exitosamente:",
                        response.data
                      );
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
          header="Venta realizada"
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Carrito;
