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
import { CategoriaType } from "../../types/CategoriasType";
import axios from "axios";

const URI = "http://localhost:8000/api/categorias/";

/**
 * Componente `CategoriasList` que muestra una lista de categorías y permite agregar, modificar y eliminar elementos.
 *
 * @component
 * 
 * @returns {JSX.Element} El componente `CategoriasList`.
 */
const CategoriasList: React.FC = () => {
  const [data, setData] = useState<CategoriaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaType | null>(
    null
  );
  const [nuevaCategoria, setNuevaCategoria] = useState<CategoriaType>({
    id: 0,
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CategoriaType[]>(URI);
        setData(response.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteCategoria = async (id: number) => {
    try {
      await axios.delete(`${URI}${id}`);
      setData(data.filter((categoria) => categoria.id !== id));
      console.log(`Categoría con ID: ${id} eliminada`);
    } catch (error) {
      console.error(`Error al eliminar la categoría con ID: ${id}`, error);
    }
  };

  const modifyCategoria = (categoria: CategoriaType) => {
    setCategoriaSeleccionada(categoria);
    setMostrarModalModificar(true);
  };

  const cerrarModalModificar = () => {
    setMostrarModalModificar(false);
    setCategoriaSeleccionada(null);
  };

  const manejarCambioModificar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (categoriaSeleccionada) {
      setCategoriaSeleccionada({
        ...categoriaSeleccionada,
        [name]: value,
      });
    }
  };

  const guardarCambiosModificar = async () => {
    if (categoriaSeleccionada) {
      try {
        await axios.put(`${URI}${categoriaSeleccionada.id}`, categoriaSeleccionada);
        setData(
          data.map((categoria) =>
            categoria.id === categoriaSeleccionada.id ? categoriaSeleccionada : categoria
          )
        );
        console.log(`Categoría con ID: ${categoriaSeleccionada.id} modificada`);
        cerrarModalModificar();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const abrirModalAgregar = () => {
    setNuevaCategoria({
      id: 0,
      nombre: "",
      descripcion: "",
    });
    setMostrarModalAgregar(true);
  };

  const cerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  const manejarCambioAgregar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setNuevaCategoria({
      ...nuevaCategoria,
      [name]: value,
    });
  };

  const guardarNuevaCategoria = async () => {
    try {
      const response = await axios.post(URI, nuevaCategoria);
      setData([...data, response.data]);
      console.log("Nueva categoría agregada:", response.data);
      cerrarModalAgregar();
    } catch (error) {
      console.error("Error al agregar la nueva categoría:", error);
    }
  };

  return (
    <>
      <IonGrid className="tabla">
        {/* Botón Agregar */}
        <IonHeader>
          <IonToolbar>
            <IonButton
              color="success"
              size="default"
              onClick={abrirModalAgregar}
            >
              <IonIcon slot="start" icon={addCircleOutline} />
              Agregar Categoría
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
          <IonCol size="3">Nombre</IonCol>
          <IonCol size="4">Descripción</IonCol>
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
        {data.map((categoria) => (
          <IonRow
            key={categoria.id}
            style={{ textAlign: "center", verticalAlign: "middle" }}
          >
            <IonCol size="1">
              <IonText>{categoria.id}</IonText>
            </IonCol>
            <IonCol size="3">
              <IonText>{categoria.nombre}</IonText>
            </IonCol>
            <IonCol size="4">
              <IonText>{categoria.descripcion}</IonText>
            </IonCol>
            <IonCol size="2">
              {/* Botón Modificar */}
              <IonButton
                color="primary"
                size="small"
                onClick={() => modifyCategoria(categoria)}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              {/* Botón Eliminar */}
              <IonButton
                color="danger"
                size="small"
                onClick={() => deleteCategoria(categoria.id)}
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

      {/* Modal para modificar datos */}
      <IonModal
        isOpen={mostrarModalModificar}
        onDidDismiss={cerrarModalModificar}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modificar Categoría</IonTitle>
            <IonButton slot="end" onClick={cerrarModalModificar}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {categoriaSeleccionada && (
            <>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  name="nombre"
                  value={categoriaSeleccionada.nombre}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Descripción</IonLabel>
                <IonInput
                  name="descripcion"
                  value={categoriaSeleccionada.descripcion}
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

      {/* Modal para agregar nueva categoría */}
      <IonModal isOpen={mostrarModalAgregar} onDidDismiss={cerrarModalAgregar}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Agregar Nueva Categoría</IonTitle>
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
              value={nuevaCategoria.nombre}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonInput
              name="descripcion"
              value={nuevaCategoria.descripcion}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          <IonButton expand="full" onClick={guardarNuevaCategoria}>
            Guardar Nueva Categoría
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default CategoriasList;
