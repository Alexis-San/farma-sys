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
import axios from "axios";
import { ProveedoresType } from "../types/ProveedoresType";

const URI = "http://localhost:8000/api/proveedores/";

const ProveedoresList: React.FC = () => {
  const [data, setData] = useState<ProveedoresType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<ProveedoresType | null>(null);
  const [nuevoProveedor, setNuevoProveedor] = useState<ProveedoresType>({
    id: 0,
    nombre: "",
    descripcion: "",
    telefono: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ProveedoresType[]>(URI);
        setData(response.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteProveedor = async (id: number) => {
    try {
      await axios.delete(`${URI}${id}`);
      setData(data.filter((proveedor) => proveedor.id !== id));
      console.log(`Proveedor con ID: ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el proveedor con ID: ${id}`, error);
    }
  };

  const modifyProveedor = (proveedor: ProveedoresType) => {
    setProveedorSeleccionado(proveedor);
    setMostrarModalModificar(true);
  };

  const cerrarModalModificar = () => {
    setMostrarModalModificar(false);
    setProveedorSeleccionado(null);
  };

  const manejarCambioModificar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (proveedorSeleccionado) {
      setProveedorSeleccionado({
        ...proveedorSeleccionado,
        [name]: value,
      });
    }
  };

  const guardarCambiosModificar = async () => {
    if (proveedorSeleccionado) {
      try {
        await axios.put(`${URI}${proveedorSeleccionado.id}`, proveedorSeleccionado);
        setData(
          data.map((proveedor) =>
            proveedor.id === proveedorSeleccionado.id ? proveedorSeleccionado : proveedor
          )
        );
        console.log(`Proveedor con ID: ${proveedorSeleccionado.id} modificado`);
        cerrarModalModificar();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const abrirModalAgregar = () => {
    setNuevoProveedor({
      id: 0,
      nombre: "",
      descripcion: "",
      telefono: "",
    });
    setMostrarModalAgregar(true);
  };

  const cerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  const manejarCambioAgregar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setNuevoProveedor({
      ...nuevoProveedor,
      [name]: value,
    });
  };

  const guardarNuevoProveedor = async () => {
    try {
      const response = await axios.post(URI, nuevoProveedor);
      setData([...data, response.data]);
      console.log("Nuevo proveedor agregado:", response.data);
      cerrarModalAgregar();
    } catch (error) {
      console.error("Error al agregar el nuevo proveedor:", error);
    }
  };

  return (
    <>
      <IonGrid className="tabla">
        <IonHeader>
          <IonToolbar>
            <IonButton
              color="success"
              size="default"
              onClick={abrirModalAgregar}
            >
              <IonIcon slot="start" icon={addCircleOutline} />
              Agregar Proveedor
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonRow
          className="encabezado"
          style={{
            background: "#f0f0f0",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <IonCol size="1">ID</IonCol>
          <IonCol size="3">Nombre</IonCol>
          <IonCol size="4">Descripción</IonCol>
          <IonCol size="2">Teléfono</IonCol>
          <IonCol size="2">Acciones</IonCol>
        </IonRow>

        {loading && (
          <IonRow>
            <IonCol>
              <IonText>Cargando datos...</IonText>
            </IonCol>
          </IonRow>
        )}

        {data.map((proveedor) => (
          <IonRow key={proveedor.id} style={{ textAlign: "center" }}>
            <IonCol size="1">
              <IonText>{proveedor.id}</IonText>
            </IonCol>
            <IonCol size="3">
              <IonText>{proveedor.nombre}</IonText>
            </IonCol>
            <IonCol size="4">
              <IonText>{proveedor.descripcion}</IonText>
            </IonCol>
            <IonCol size="2">
              <IonText>{proveedor.telefono}</IonText>
            </IonCol>
            <IonCol size="2">
              <IonButton
                color="primary"
                size="small"
                onClick={() => modifyProveedor(proveedor)}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton
                color="danger"
                size="small"
                onClick={() => deleteProveedor(proveedor.id)}
                style={{ marginLeft: "5px" }}
              >
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        ))}

        {!loading && data.length === 0 && (
          <IonRow>
            <IonCol>
              <IonText>No hay datos disponibles</IonText>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>

      <IonModal isOpen={mostrarModalModificar} onDidDismiss={cerrarModalModificar}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modificar Proveedor</IonTitle>
            <IonButton slot="end" onClick={cerrarModalModificar}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {proveedorSeleccionado && (
            <>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  name="nombre"
                  value={proveedorSeleccionado.nombre}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Descripción</IonLabel>
                <IonInput
                  name="descripcion"
                  value={proveedorSeleccionado.descripcion}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Teléfono</IonLabel>
                <IonInput
                  name="telefono"
                  value={proveedorSeleccionado.telefono}
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

      <IonModal isOpen={mostrarModalAgregar} onDidDismiss={cerrarModalAgregar}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Agregar Nuevo Proveedor</IonTitle>
            <IonButton slot="end" onClick={cerrarModalAgregar}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              name="nombre"
              value={nuevoProveedor.nombre}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonInput
              name="descripcion"
              value={nuevoProveedor.descripcion}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Teléfono</IonLabel>
            <IonInput
              name="telefono"
              value={nuevoProveedor.telefono}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          <IonButton expand="full" onClick={guardarNuevoProveedor}>
            Guardar Nuevo Proveedor
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ProveedoresList;
