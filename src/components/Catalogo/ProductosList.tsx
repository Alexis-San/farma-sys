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
import "../../theme/listas.css";

const URI = "http://localhost:8000/api/productos/";

// 1. Modificar ProductosType
interface ProductosType {
  id: number;
  nombre_comercial: string;
  presentacion: string;
  precio_venta: number;
  condicion_venta: string;
  procedencia: string;
  laboratorioId?: number;
  Laboratorio?: any;
  Actuadores?: any[];
  Categorias?: any[];
  Proveedores?: any[];
}

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
    laboratorioId: undefined,
    Actuadores: [],
    Categorias: [],
    Proveedores: [],
  });

  // 2. Agregar estados para las listas
  const [laboratorios, setLaboratorios] = useState<any[]>([]);
  const [actuadores, setActuadores] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [proveedores, setProveedores] = useState<any[]>([]);

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
    cargarListas();
  }, []);

  // 3. Agregar funciones para cargar las listas
  const cargarListas = async () => {
    const [labRes, actRes, catRes, provRes] = await Promise.all([
      axios.get("http://localhost:8000/api/laboratorios"),
      axios.get("http://localhost:8000/api/actuadores"),
      axios.get("http://localhost:8000/api/categorias"),
      axios.get("http://localhost:8000/api/proveedores"),
    ]);
    setLaboratorios(labRes.data);
    setActuadores(actRes.data);
    setCategorias(catRes.data);
    setProveedores(provRes.data);
  };

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
      const productoData = {
        ...nuevoProducto,
        actuadores_ids: nuevoProducto.Actuadores,
        categorias_ids: nuevoProducto.Categorias,
        proveedores_ids: nuevoProducto.Proveedores,
      };

      const response = await axios.post(URI, productoData);
      setData([...data, response.data]);
      cerrarModalAgregar();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <IonContent scrollX>
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
          <IonCol size="0.5">ID</IonCol>
          <IonCol size="1.5">Nombre Comercial</IonCol>
          <IonCol size="1">Presentación</IonCol>
          <IonCol size="1">Precio</IonCol>
          <IonCol size="0.75">Condición</IonCol>
          <IonCol size="0.75">Procedencia</IonCol>
          <IonCol size="1">Laboratorio</IonCol>
          <IonCol size="1.5">Actuadores</IonCol>
          <IonCol size="1.5">Categorías</IonCol>
          <IonCol size="1.5">Proveedores</IonCol>
          <IonCol size="1">Acciones</IonCol>
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
            class="ion-text-center ion-align-items-center"
          >
            <IonCol size="0.5">{producto.id}</IonCol>
            <IonCol size="1.5">{producto.nombre_comercial}</IonCol>
            <IonCol size="1">{producto.presentacion}</IonCol>
            <IonCol size="1">{producto.precio_venta}</IonCol>
            <IonCol size="0.75">{producto.condicion_venta}</IonCol>
            <IonCol size="0.75">{producto.procedencia}</IonCol>
            <IonCol size="1">{producto.Laboratorio?.nombre || "-"}</IonCol>
            <IonCol size="1.5">
              <IonText>
                {producto.Actuadores?.map((a) => a.nombre).join(", ") || "-"}
              </IonText>
            </IonCol>
            <IonCol size="1.5">
              <IonText>
                {producto.Categorias?.map((c) => c.nombre).join(", ") || "-"}
              </IonText>
            </IonCol>
            <IonCol size="1.5">
              <IonText>
                {producto.Proveedores?.map((p) => p.nombre).join(", ") || "-"}
              </IonText>
            </IonCol>
            <IonCol size="1">
              {/* Botón Modificar */}
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
          <IonItem>
            <IonLabel>Laboratorio</IonLabel>
            <IonSelect
              value={nuevoProducto.laboratorioId}
              onIonChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  laboratorioId: e.detail.value,
                })
              }
            >
              {laboratorios.map((lab) => (
                <IonSelectOption key={lab.id} value={lab.id}>
                  {lab.nombre}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Actuadores</IonLabel>
            <IonSelect
              multiple={true}
              value={nuevoProducto.Actuadores}
              onIonChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  Actuadores: e.detail.value,
                })
              }
            >
              {actuadores.map((act) => (
                <IonSelectOption key={act.id} value={act.id}>
                  {act.nombre}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Categorías</IonLabel>
            <IonSelect
              multiple={true}
              value={nuevoProducto.Categorias}
              onIonChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  Categorias: e.detail.value,
                })
              }
            >
              {categorias.map((cat) => (
                <IonSelectOption key={cat.id} value={cat.id}>
                  {cat.nombre}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Proveedores</IonLabel>
            <IonSelect
              multiple={true}
              value={nuevoProducto.Proveedores}
              onIonChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  Proveedores: e.detail.value,
                })
              }
            >
              {proveedores.map((prov) => (
                <IonSelectOption key={prov.id} value={prov.id}>
                  {prov.nombre}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {/* Repetir para categorías y proveedores */}

          <IonButton expand="full" onClick={guardarNuevoProducto}>
            Guardar Nuevo Producto
          </IonButton>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default ProductosList;
