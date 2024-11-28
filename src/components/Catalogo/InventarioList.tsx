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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { createOutline, trashOutline, addCircleOutline } from "ionicons/icons";
import axios from "axios";

const URI = "http://localhost:8000/api/inventario/";

interface ProductoType {
  id: number;
  codigo_cafapar: number;
  nombre_comercial: string;
  presentacion: string;
  descripcion: string;
  precio_venta: number;
  condicion_venta: string;
  procedencia: string;
  laboratorioId: number;
}

interface InventarioType {
  id: number;
  precio_venta: number;
  precio_compra: number;
  descripcion: string;
  fecha_vencimiento: string;
  stock: number;
  estado: boolean;
  productoId: number;
  producto: ProductoType;
}

const InventarioList: React.FC = () => {
  const [data, setData] = useState<InventarioType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [inventarioSeleccionado, setInventarioSeleccionado] =
    useState<InventarioType | null>(null);
  const [nuevoInventario, setNuevoInventario] = useState<InventarioType>({
    id: 0,
    precio_venta: 0,
    precio_compra: 0,
    descripcion: "",
    fecha_vencimiento: "",
    stock: 0,
    estado: true,
    productoId: 0,
    producto: {
      id: 0,
      codigo_cafapar: 0,
      nombre_comercial: "",
      presentacion: "",
      descripcion: "",
      precio_venta: 0,
      condicion_venta: "",
      procedencia: "",
      laboratorioId: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<InventarioType[]>(URI);
        setData(response.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteInventario = async (id: number) => {
    try {
      await axios.delete(`${URI}${id}`);
      setData(data.filter((inventario) => inventario.id !== id));
    } catch (error) {
      console.error(`Error al eliminar el inventario con ID: ${id}`, error);
    }
  };

  const abrirModal = (inventario: InventarioType | null) => {
    setInventarioSeleccionado(inventario);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setInventarioSeleccionado(null);
  };

  const manejarCambio = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (inventarioSeleccionado) {
      setInventarioSeleccionado({
        ...inventarioSeleccionado,
        [name]: value,
      });
    } else {
      setNuevoInventario({
        ...nuevoInventario,
        [name]: value,
      });
    }
  };

  const guardarCambios = async () => {
    try {
      if (inventarioSeleccionado) {
        await axios.put(
          `${URI}${inventarioSeleccionado.id}`,
          inventarioSeleccionado
        );
        setData(
          data.map((inventario) =>
            inventario.id === inventarioSeleccionado.id
              ? inventarioSeleccionado
              : inventario
          )
        );
      } else {
        const response = await axios.post(URI, nuevoInventario);
        setData([...data, response.data]);
      }
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  return (
    <>
      <IonGrid>
        <IonHeader>
          <IonToolbar>
            <IonButton color="success" onClick={() => abrirModal(null)}>
              <IonIcon slot="start" icon={addCircleOutline} />
              Agregar Inventario
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonRow style={{ background: "#f0f0f0", fontWeight: "bold" }}>
          <IonCol>ID</IonCol>
          <IonCol>Producto</IonCol>
          <IonCol>Stock</IonCol>
          <IonCol>Precio Venta</IonCol>
          <IonCol>Precio Compra</IonCol>
          <IonCol>Fecha Vencimiento</IonCol>
          <IonCol>Acciones</IonCol>
        </IonRow>

        {loading && (
          <IonRow>
            <IonCol>
              <IonText>Cargando datos...</IonText>
            </IonCol>
          </IonRow>
        )}

        {data.map((inventario) => (
          <IonRow key={inventario.id}>
            <IonCol>{inventario.id}</IonCol>
            <IonCol>{inventario.producto.nombre_comercial}</IonCol>
            <IonCol>{inventario.stock}</IonCol>
            <IonCol>{inventario.precio_venta}</IonCol>
            <IonCol>{inventario.precio_compra}</IonCol>
            <IonCol>
              {new Date(inventario.fecha_vencimiento).toLocaleDateString()}
            </IonCol>
            <IonCol>
              <IonButton color="primary" onClick={() => abrirModal(inventario)}>
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton
                color="danger"
                onClick={() => deleteInventario(inventario.id)}
              >
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        ))}

        {!loading && data.length === 0 && (
          <IonRow>
            <IonCol>No hay inventarios disponibles</IonCol>
          </IonRow>
        )}
      </IonGrid>

      <IonModal isOpen={mostrarModal} onDidDismiss={cerrarModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              {inventarioSeleccionado
                ? "Modificar Inventario"
                : "Agregar Inventario"}
            </IonTitle>
            <IonButton slot="end" onClick={cerrarModal}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel position="stacked">Producto</IonLabel>
            <IonInput
              name="productoId"
              value={
                inventarioSeleccionado?.productoId ?? nuevoInventario.productoId
              }
              onIonChange={manejarCambio}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Stock</IonLabel>
            <IonInput
              type="number"
              name="stock"
              value={inventarioSeleccionado?.stock ?? nuevoInventario.stock}
              onIonChange={manejarCambio}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Precio Venta</IonLabel>
            <IonInput
              type="number"
              name="precio_venta"
              value={
                inventarioSeleccionado?.precio_venta ??
                nuevoInventario.precio_venta
              }
              onIonChange={manejarCambio}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Precio Compra</IonLabel>
            <IonInput
              type="number"
              name="precio_compra"
              value={
                inventarioSeleccionado?.precio_compra ??
                nuevoInventario.precio_compra
              }
              onIonChange={manejarCambio}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Fecha Vencimiento</IonLabel>
            <IonInput
              type="date"
              name="fecha_vencimiento"
              value={
                inventarioSeleccionado?.fecha_vencimiento ??
                nuevoInventario.fecha_vencimiento
              }
              onIonChange={manejarCambio}
            />
          </IonItem>
          <IonButton expand="full" onClick={guardarCambios}>
            {inventarioSeleccionado ? "Guardar Cambios" : "Agregar Inventario"}
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default InventarioList;
