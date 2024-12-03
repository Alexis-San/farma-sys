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
import { DrogasType } from "../../types/DrogasType";
import axios from "axios";
import "../../theme/listas.css";

const URI = "http://localhost:8000/api/actuadores/";

/**
 * Componente `DrogasList` que muestra una lista de drogas y permite agregar, modificar y eliminar elementos.
 *
 * @component
 *
 * @description
 * Este componente utiliza la librería `React` y `Ionic` para mostrar una lista de drogas.
 * Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las drogas.
 *
 * @example
 * <DrogasList />
 *
 * @returns {JSX.Element} El componente `DrogasList`.
 *
 * @typedef {Object} DrogasType
 * @property {number} id - Identificador único de la droga.
 * @property {string} nombre - Nombre de la droga.
 *
 * @state {DrogasType[]} data - Estado que almacena la lista de drogas.
 * @state {boolean} loading - Estado que indica si los datos están cargando.
 * @state {boolean} mostrarModalModificar - Estado que controla la visibilidad del modal de modificación.
 * @state {boolean} mostrarModalAgregar - Estado que controla la visibilidad del modal de agregar.
 * @state {DrogasType | null} drogaSeleccionada - Estado que almacena la droga seleccionada para modificar.
 * @state {DrogasType} nuevaDroga - Estado que almacena los datos de la nueva droga a agregar.
 *
 * @function fetchData - Función que obtiene los datos de las drogas desde el servidor.
 * @async
 * @returns {Promise<void>}
 *
 * @function deleteDroga - Función que elimina una droga por su ID.
 * @async
 * @param {number} id - Identificador de la droga a eliminar.
 * @returns {Promise<void>}
 *
 * @function modifyDroga - Función que selecciona una droga para modificar y muestra el modal de modificación.
 * @param {DrogasType} droga - Droga a modificar.
 *
 * @function cerrarModalModificar - Función que cierra el modal de modificación.
 *
 * @function manejarCambioModificar - Función que maneja los cambios en los campos del formulario de modificación.
 * @param {CustomEvent} e - Evento de cambio.
 *
 * @function guardarCambiosModificar - Función que guarda los cambios realizados en una droga.
 * @async
 * @returns {Promise<void>}
 *
 * @function abrirModalAgregar - Función que inicializa los datos de una nueva droga y muestra el modal de agregar.
 *
 * @function cerrarModalAgregar - Función que cierra el modal de agregar.
 *
 * @function manejarCambioAgregar - Función que maneja los cambios en los campos del formulario de agregar.
 * @param {CustomEvent} e - Evento de cambio.
 *
 * @function guardarNuevaDroga - Función que guarda una nueva droga.
 * @async
 * @returns {Promise<void>}
 *
 * @returns {JSX.Element} El componente `DrogasList` que incluye la tabla de drogas y los modales para agregar y modificar.
 */
const DrogasList: React.FC = () => {
  const [data, setData] = useState<DrogasType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [drogaSeleccionada, setDrogaSeleccionada] = useState<DrogasType | null>(
    null
  );
  const [nuevaDroga, setNuevaDroga] = useState<DrogasType>({
    id: 0,
    nombre: "",
    // Otros campos si es necesario
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DrogasType[]>(URI);
        setData(response.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteDroga = async (id: number) => {
    try {
      await axios.delete(`${URI}${id}`);
      setData(data.filter((droga) => droga.id !== id));
      console.log(`Droga con ID: ${id} eliminada`);
    } catch (error) {
      console.error(`Error al eliminar la droga con ID: ${id}`, error);
    }
  };

  const modifyDroga = (droga: DrogasType) => {
    setDrogaSeleccionada(droga);
    setMostrarModalModificar(true);
  };

  const cerrarModalModificar = () => {
    setMostrarModalModificar(false);
    setDrogaSeleccionada(null);
  };

  const manejarCambioModificar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (drogaSeleccionada) {
      setDrogaSeleccionada({
        ...drogaSeleccionada,
        [name]: value,
      });
    }
  };

  const guardarCambiosModificar = async () => {
    if (drogaSeleccionada) {
      try {
        await axios.put(`${URI}${drogaSeleccionada.id}`, drogaSeleccionada);
        setData(
          data.map((droga) =>
            droga.id === drogaSeleccionada.id ? drogaSeleccionada : droga
          )
        );
        console.log(`Droga con ID: ${drogaSeleccionada.id} modificada`);
        cerrarModalModificar();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const abrirModalAgregar = () => {
    setNuevaDroga({
      id: 0,
      nombre: "",
      // Otros campos si es necesario
    });
    setMostrarModalAgregar(true);
  };

  const cerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  const manejarCambioAgregar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setNuevaDroga({
      ...nuevaDroga,
      [name]: value,
    });
  };

  const guardarNuevaDroga = async () => {
    try {
      const response = await axios.post(URI, nuevaDroga);
      setData([...data, response.data]);
      console.log("Nueva droga agregada:", response.data);
      cerrarModalAgregar();
    } catch (error) {
      console.error("Error al agregar la nueva droga:", error);
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
          <IonCol size="2">ID</IonCol>
          <IonCol size="6">Nombre</IonCol>
          <IonCol size="4">Acciones</IonCol>
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
        {data.map((droga) => (
          <IonRow
            key={droga.id}
            style={{ textAlign: "center", verticalAlign: "middle" }}
          >
            <IonCol size="2">
              <IonText>{droga.id}</IonText>
            </IonCol>
            <IonCol size="6">
              <IonText>{droga.nombre}</IonText>
            </IonCol>
            <IonCol size="4">
              {/* Botón Modificar */}
              <IonButton
                color="primary"
                size="small"
                onClick={() => modifyDroga(droga)}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              {/* Botón Eliminar */}
              <IonButton
                color="danger"
                size="small"
                onClick={() => deleteDroga(droga.id)}
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
            <IonTitle>Modificar Droga</IonTitle>
            <IonButton slot="end" onClick={cerrarModalModificar}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {drogaSeleccionada && (
            <>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  name="nombre"
                  value={drogaSeleccionada.nombre}
                  onIonChange={manejarCambioModificar}
                />
              </IonItem>
              {/* Agrega más campos si es necesario */}
              <IonButton expand="full" onClick={guardarCambiosModificar}>
                Guardar Cambios
              </IonButton>
            </>
          )}
        </IonContent>
      </IonModal>

      {/* Modal para agregar nueva droga */}
      <IonModal isOpen={mostrarModalAgregar} onDidDismiss={cerrarModalAgregar}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Agregar Nueva Droga</IonTitle>
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
              value={nuevaDroga.nombre}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          {/* Agrega más campos si es necesario */}
          <IonButton expand="full" onClick={guardarNuevaDroga}>
            Guardar Nueva Droga
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default DrogasList;
