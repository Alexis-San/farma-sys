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
import { ProductosType } from "../../types/ProductosType";
import axios from "axios";
import "../../theme/listas.css";

const URI = "http://localhost:8000/api/productos/";

const ProductosList: React.FC = () => {
  const [data, setData] = useState<ProductosType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<ProductosType | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<ProductosType>({
    id: 0,
    nombre_comercial: "",
    presentacion: "",
    precio_venta: 0,
    condicion_venta: "VENTA LIBRE",
    procedencia: "NACIONAL",
    codigo_cafapar: undefined,
    descripcion: "",
    laboratorioId: undefined,
  });

  useEffect(() => {
    // Función para obtener los productos desde la API
    const fetchData = async () => {
      try {
        const response = await axios.get<ProductosType[]>(URI);
        setData(response.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para eliminar un producto
  const deleteProducto = async (id: number) => {
    try {
      await axios.delete(`${URI}${id}`);
      setData(data.filter((producto) => producto.id !== id));
      console.log(`Producto con ID: ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el producto con ID: ${id}`, error);
    }
  };

  // Función para abrir el modal de modificación
  const modifyProducto = (producto: ProductosType) => {
    setProductoSeleccionado(producto);
    setMostrarModalModificar(true);
  };

  // Función para cerrar el modal de modificación
  const cerrarModalModificar = () => {
    setMostrarModalModificar(false);
    setProductoSeleccionado(null);
  };

  // Función para manejar cambios en el formulario de modificación
  const manejarCambioModificar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (productoSeleccionado) {
      setProductoSeleccionado({
        ...productoSeleccionado,
        [name]: value,
      });
    }
  };

  // Función para guardar los cambios en el producto
  const guardarCambiosModificar = async () => {
    if (productoSeleccionado) {
      try {
        await axios.put(
          `${URI}${productoSeleccionado.id}`,
          productoSeleccionado
        );
        setData(
          data.map((producto) =>
            producto.id === productoSeleccionado.id
              ? productoSeleccionado
              : producto
          )
        );
        console.log(`Producto con ID: ${productoSeleccionado.id} modificado`);
        cerrarModalModificar();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  // Función para abrir el modal de agregar
  const abrirModalAgregar = () => {
    setNuevoProducto({
      id: 0,
      nombre_comercial: "",
      presentacion: "",
      precio_venta: 0,
      condicion_venta: "VENTA LIBRE",
      procedencia: "NACIONAL",
      codigo_cafapar: undefined,
      descripcion: "",
      laboratorioId: undefined,
    });
    setMostrarModalAgregar(true);
  };

  // Función para cerrar el modal de agregar
  const cerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  // Función para manejar cambios en el formulario de agregar
  const manejarCambioAgregar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setNuevoProducto({
      ...nuevoProducto,
      [name]: value,
    });
  };

  // Función para guardar un nuevo producto
  const guardarNuevoProducto = async () => {
    try {
      const response = await axios.post(URI, nuevoProducto);

      // Actualizar el estado data usando nuevoProducto y el id devuelto por el servidor
      const productoConId = { ...nuevoProducto, id: response.data.id };
      setData([...data, productoConId]);

      console.log("Nuevo producto agregado:", productoConId);
      cerrarModalAgregar();
    } catch (error) {
      console.error("Error al agregar el nuevo producto:", error);
    }
  };

  return (
    <>
      <IonGrid className="tabla-personalizada">
        {/* Botón Agregar */}
        <IonHeader>
          <IonToolbar>
            <IonButton
              color="success"
              size="default"
              onClick={abrirModalAgregar}
            >
              <IonIcon slot="start" icon={addCircleOutline} />
              Agregar Producto
            </IonButton>
          </IonToolbar>
        </IonHeader>

        {/* Encabezado */}
        <IonRow
          className="encabezado"
          style={{
            background: "#f0f0f0",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <IonCol size="1">ID</IonCol>
          <IonCol size="2">Nombre Comercial</IonCol>
          <IonCol size="2">Presentación</IonCol>
          <IonCol size="1">Precio</IonCol>
          <IonCol size="2">Condición</IonCol>
          <IonCol size="2">Procedencia</IonCol>
          <IonCol size="2">Acciones</IonCol>
        </IonRow>

        {/* Mostrar mensaje de carga */}
        {loading && (
          <IonRow>
            <IonCol>
              <IonText>Cargando datos...</IonText>
            </IonCol>
          </IonRow>
        )}

        {/* Mostrar filas si hay datos */}
        {data.map((producto) => (
          <IonRow
            key={producto.id}
            style={{ textAlign: "center", verticalAlign: "middle" }}
          >
            <IonCol size="1">
              <IonText>{producto.id}</IonText>
            </IonCol>
            <IonCol size="2">
              <IonText>{producto.nombre_comercial}</IonText>
            </IonCol>
            <IonCol size="2">
              <IonText>{producto.presentacion}</IonText>
            </IonCol>
            <IonCol size="1">
              <IonText>{producto.precio_venta}</IonText>
            </IonCol>
            <IonCol size="2">
              <IonText>{producto.condicion_venta}</IonText>
            </IonCol>
            <IonCol size="2">
              <IonText>{producto.procedencia}</IonText>
            </IonCol>
            <IonCol size="2">
              {/* Bot��n Modificar */}
              <IonButton
                color="primary"
                size="small"
                onClick={() => modifyProducto(producto)}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              {/* Botón Eliminar */}
              <IonButton
                color="danger"
                size="small"
                onClick={() => deleteProducto(producto.id)}
                style={{ marginLeft: "5px" }}
              >
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        ))}

        {/* Mostrar mensaje si no hay datos */}
        {!loading && data.length === 0 && (
          <IonRow>
            <IonCol>
              <IonText>No hay datos disponibles</IonText>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>

      {/* Modal para modificar producto */}
      <IonModal
        isOpen={mostrarModalModificar}
        onDidDismiss={cerrarModalModificar}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modificar Producto</IonTitle>
            <IonButton slot="end" onClick={cerrarModalModificar}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {productoSeleccionado && (
            <>
              <IonItem>
                <IonLabel position="stacked">Nombre Comercial</IonLabel>
                <IonInput
                  name="nombre_comercial"
                  value={productoSeleccionado.nombre_comercial}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Presentación</IonLabel>
                <IonInput
                  name="presentacion"
                  value={productoSeleccionado.presentacion}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Precio Venta</IonLabel>
                <IonInput
                  type="number"
                  name="precio_venta"
                  value={productoSeleccionado.precio_venta}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Condición de Venta</IonLabel>
                <IonSelect
                  name="condicion_venta"
                  value={productoSeleccionado.condicion_venta}
                  onIonChange={manejarCambioModificar}
                >
                  <IonSelectOption value="BAJO RECETA">
                    BAJO RECETA
                  </IonSelectOption>
                  <IonSelectOption value="VENTA LIBRE">
                    VENTA LIBRE
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Procedencia</IonLabel>
                <IonSelect
                  name="procedencia"
                  value={productoSeleccionado.procedencia}
                  onIonChange={manejarCambioModificar}
                >
                  <IonSelectOption value="NACIONAL">NACIONAL</IonSelectOption>
                  <IonSelectOption value="IMPORTADO">IMPORTADO</IonSelectOption>
                </IonSelect>
              </IonItem>
              {/* Agrega más campos si es necesario */}
              <IonButton expand="full" onClick={guardarCambiosModificar}>
                Guardar Cambios
              </IonButton>
            </>
          )}
        </IonContent>
      </IonModal>

      {/* Modal para agregar nuevo producto */}
      <IonModal isOpen={mostrarModalAgregar} onDidDismiss={cerrarModalAgregar}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Agregar Nuevo Producto</IonTitle>
            <IonButton slot="end" onClick={cerrarModalAgregar}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonLabel position="stacked">Nombre Comercial</IonLabel>
            <IonInput
              name="nombre_comercial"
              value={nuevoProducto.nombre_comercial}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Presentación</IonLabel>
            <IonInput
              name="presentacion"
              value={nuevoProducto.presentacion}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Precio Venta</IonLabel>
            <IonInput
              type="number"
              name="precio_venta"
              value={nuevoProducto.precio_venta}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Condición de Venta</IonLabel>
            <IonSelect
              name="condicion_venta"
              value={nuevoProducto.condicion_venta}
              onIonChange={manejarCambioAgregar}
            >
              <IonSelectOption value="BAJO RECETA">BAJO RECETA</IonSelectOption>
              <IonSelectOption value="VENTA LIBRE">VENTA LIBRE</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Procedencia</IonLabel>
            <IonSelect
              name="procedencia"
              value={nuevoProducto.procedencia}
              onIonChange={manejarCambioAgregar}
            >
              <IonSelectOption value="NACIONAL">NACIONAL</IonSelectOption>
              <IonSelectOption value="IMPORTADO">IMPORTADO</IonSelectOption>
            </IonSelect>
          </IonItem>
          {/* Agrega más campos si es necesario */}
          <IonButton expand="full" onClick={guardarNuevoProducto}>
            Guardar Nuevo Producto
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ProductosList;
