import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
  IonHeader,
  IonToolbar,
  IonModal,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTitle,
} from "@ionic/react";
import { createOutline, trashOutline, addCircleOutline } from "ionicons/icons";
import { ClientesType } from "../types/ClientesType";
import axios from "axios";
import "../theme/listas.css";
import AgregarClienteForm from "./AgregarClienteForm";

const URI = "http://localhost:8000/api/clientes/";

const ClientesList: React.FC = () => {
  const [data, setData] = useState<ClientesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<ClientesType | null>(null);
  const [nuevoCliente, setNuevoCliente] = useState<ClientesType>({
    id: 0,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    tipo_cliente: "",
    ci: "", // Include 'ci' field
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URI);
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

  const deleteCliente = async (id: number) => {
    try {
      await axios.delete(`${URI}${id}`);
      setData(data.filter((cliente) => cliente.id !== id));
      console.log(`Cliente con ID: ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el cliente con ID: ${id}`, error);
    }
  };

  const modifyCliente = (cliente: ClientesType) => {
    setClienteSeleccionado(cliente);
    setMostrarModalModificar(true);
  };

  const cerrarModalModificar = () => {
    setMostrarModalModificar(false);
    setClienteSeleccionado(null);
  };

  const manejarCambioModificar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (clienteSeleccionado) {
      setClienteSeleccionado({
        ...clienteSeleccionado,
        [name]: value,
      });
    }
  };

  const guardarCambiosModificar = async () => {
    if (clienteSeleccionado) {
      try {
        await axios.put(`${URI}${clienteSeleccionado.id}`, clienteSeleccionado);
        setData(
          data.map((cliente) =>
            cliente.id === clienteSeleccionado.id
              ? clienteSeleccionado
              : cliente
          )
        );
        console.log(`Cliente con ID: ${clienteSeleccionado.id} modificado`);
        cerrarModalModificar();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const guardarNuevoCliente = async () => {
    try {
      const response = await axios.post(URI, nuevoCliente);
      setData([...data, response.data]); // Agregar el nuevo cliente a la lista
      setNuevoCliente({
        id: 0,
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        tipo_cliente: "",
        ci: "", // Add new field
      }); // Limpiar el formulario
      setMostrarModalAgregar(false); // Cerrar el modal
      console.log("Cliente agregado exitosamente:", response.data);
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
    }
  };

  return (
    <>
      <IonGrid className="tabla-personalizada">
        <IonHeader>
          <IonToolbar>
            <IonButton
              color="success"
              onClick={() => setMostrarModalAgregar(true)}
            >
              <IonIcon slot="start" icon={addCircleOutline} />
              Agregar Cliente
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonRow className="encabezado" style={{ background: "#f0f0f0" }}>
          <IonCol size="0.5">ID</IonCol>
          <IonCol size="1">CI</IonCol>
          <IonCol size="1.5">Nombre</IonCol>
          <IonCol size="1.8">Apellido</IonCol>
          <IonCol size="3.2">Email</IonCol>
          <IonCol size="1">Teléfono</IonCol>
          <IonCol size="1">Tipo</IonCol>
          <IonCol size="2">Acciones</IonCol>
        </IonRow>

        {loading && (
          <IonRow>
            <IonCol>
              <IonText>Cargando datos...</IonText>
            </IonCol>
          </IonRow>
        )}

        {data.map((cliente) => (
          <IonRow key={cliente.id}>
            <IonCol size="0.5">{cliente.id}</IonCol>
            <IonCol size="1">{cliente.ci}</IonCol> {/* Display 'ci' value */}
            <IonCol size="1.5">{cliente.nombre}</IonCol>
            <IonCol size="1.8">{cliente.apellido}</IonCol>
            <IonCol size="3.2">{cliente.email}</IonCol>
            <IonCol size="1">{cliente.telefono}</IonCol>
            <IonCol size="1">{cliente.tipo_cliente}</IonCol>
            <IonCol size="2">
              <IonButton color="primary" onClick={() => modifyCliente(cliente)}>
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton
                color="danger"
                onClick={() => deleteCliente(cliente.id)}
              >
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        ))}

        {!loading && data.length === 0 && (
          <IonRow>
            <IonCol>
              <IonText>No hay clientes disponibles</IonText>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>

      {/* Modal de Agregar Cliente */}
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
          <AgregarClienteForm
            onGuardarCliente={async (nuevoCliente) => {
              try {
                const response = await axios.post(URI, nuevoCliente);
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

      {/* Modal de Modificación */}
      <IonModal
        isOpen={mostrarModalModificar}
        onDidDismiss={cerrarModalModificar}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modificar Cliente</IonTitle>
            <IonButton slot="end" onClick={cerrarModalModificar}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {clienteSeleccionado && (
            <>
              <IonItem>
                <IonLabel position="stacked">CI</IonLabel>
                <IonInput
                  name="ci"
                  value={clienteSeleccionado.ci}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  name="nombre"
                  value={clienteSeleccionado.nombre}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Apellido</IonLabel>
                <IonInput
                  name="apellido"
                  value={clienteSeleccionado.apellido}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  name="email"
                  value={clienteSeleccionado.email}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Teléfono</IonLabel>
                <IonInput
                  name="telefono"
                  value={clienteSeleccionado.telefono}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Tipo</IonLabel>
                <IonInput
                  name="tipo_cliente"
                  value={clienteSeleccionado.tipo_cliente}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonButton expand="full" onClick={guardarCambiosModificar}>
                Guardar Cambios
              </IonButton>
            </>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default ClientesList;
