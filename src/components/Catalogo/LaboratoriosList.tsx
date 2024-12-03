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
import { LaboratoriosType } from "../../types/LaboratoriosType";
import "../../theme/listas.css";

const URI = "http://localhost:8000/api/laboratorios/";

/**
 * Componente `LaboratoriosList` que muestra una lista de laboratorios y permite agregar, modificar y eliminar elementos.
 *
 * @component
 * 
 * @returns {JSX.Element} El componente `LaboratoriosList`.
 */
const LaboratoriosList: React.FC = () => {
    const [data, setData] = useState<LaboratoriosType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalModificar, setMostrarModalModificar] = useState(false);
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [laboratorioSeleccionado, setLaboratorioSeleccionado] = useState<LaboratoriosType | null>(null);
  const [nuevoLaboratorio, setNuevoLaboratorio] = useState({
    id: 0,
    nombre: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URI);
        setData(response.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteLaboratorio = async (id: number) => {
    try {
      await axios.delete(`${URI}${id}`);
      setData(data.filter((laboratorio) => laboratorio.id !== id));
      console.log(`Laboratorio con ID: ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el laboratorio con ID: ${id}`, error);
    }
  };

  const modifyLaboratorio = (laboratorio: { id: number; nombre: string }) => {
    setLaboratorioSeleccionado(laboratorio);
    setMostrarModalModificar(true);
  };

  const cerrarModalModificar = () => {
    setMostrarModalModificar(false);
    setLaboratorioSeleccionado(null);
  };

  const manejarCambioModificar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (laboratorioSeleccionado) {
      setLaboratorioSeleccionado({
        ...laboratorioSeleccionado,
        [name]: value,
      });
    }
  };

  const guardarCambiosModificar = async () => {
    if (laboratorioSeleccionado) {
      try {
        await axios.put(`${URI}${laboratorioSeleccionado.id}`, laboratorioSeleccionado);
        setData(
          data.map((laboratorio) =>
            laboratorio.id === laboratorioSeleccionado.id
              ? laboratorioSeleccionado
              : laboratorio
          )
        );
        console.log(`Laboratorio con ID: ${laboratorioSeleccionado.id} modificado`);
        cerrarModalModificar();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      }
    }
  };

  const abrirModalAgregar = () => {
    setNuevoLaboratorio({
      id: 0,
      nombre: "",
    });
    setMostrarModalAgregar(true);
  };

  const cerrarModalAgregar = () => {
    setMostrarModalAgregar(false);
  };

  const manejarCambioAgregar = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setNuevoLaboratorio({
      ...nuevoLaboratorio,
      [name]: value,
    });
  };

  const guardarNuevoLaboratorio = async () => {
    try {
      const response = await axios.post(URI, nuevoLaboratorio);
      setData([...data, response.data]);
      console.log("Nuevo laboratorio agregado:", response.data);
      cerrarModalAgregar();
    } catch (error) {
      console.error("Error al agregar el nuevo laboratorio:", error);
    }
  };

  return (
    <>
      <IonGrid className="tabla-persoanalizada">
        <IonHeader>
          <IonToolbar>
            <IonButton
              color="success"
              size="default"
              onClick={abrirModalAgregar}
            >
              <IonIcon slot="start" icon={addCircleOutline} />
              Agregar Laboratorio
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
          <IonCol size="2">ID</IonCol>
          <IonCol size="6">Nombre</IonCol>
          <IonCol size="4">Acciones</IonCol>
        </IonRow>

        {loading && (
          <IonRow>
            <IonCol>
              <IonText>Cargando datos...</IonText>
            </IonCol>
          </IonRow>
        )}

        {data.map((laboratorio) => (
          <IonRow key={laboratorio.id} style={{ textAlign: "center" }}>
            <IonCol size="2">
              <IonText>{laboratorio.id}</IonText>
            </IonCol>
            <IonCol size="6">
              <IonText>{laboratorio.nombre}</IonText>
            </IonCol>
            <IonCol size="4">
              <IonButton
                color="primary"
                size="small"
                onClick={() => modifyLaboratorio(laboratorio)}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton
                color="danger"
                size="small"
                onClick={() => deleteLaboratorio(laboratorio.id)}
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
            <IonTitle>Modificar Laboratorio</IonTitle>
            <IonButton slot="end" onClick={cerrarModalModificar}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {laboratorioSeleccionado && (
            <>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  name="nombre"
                  value={laboratorioSeleccionado.nombre}
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
            <IonTitle>Agregar Nuevo Laboratorio</IonTitle>
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
              value={nuevoLaboratorio.nombre}
              onIonChange={manejarCambioAgregar}
            />
          </IonItem>
          <IonButton expand="full" onClick={guardarNuevoLaboratorio}>
            Guardar Nuevo Laboratorio
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default LaboratoriosList;
