import React, { useEffect, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonAlert,
  IonTitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import "../../theme/ventas.css";

const HistorialVentas: React.FC = () => {
  const [ventas, setVentas] = useState<any[]>([]);
  const [displayedVentas, setDisplayedVentas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10000; // Cantidad de ventas a mostrar por carga

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/informes/ventas"
        );
        const data = await response.json();

        if (data.ok) {
          // Ordenar por fecha de creación (más reciente primero)
          const sortedVentas = data.ventas.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setVentas(sortedVentas);
          setDisplayedVentas(sortedVentas.slice(0, itemsPerPage));
        } else {
          setError("Error al cargar las ventas");
        }
      } catch (err) {
        setError("No se pudo conectar con la API");
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  const loadMoreVentas = (event: CustomEvent<void>) => {
    const target = event.target as HTMLIonInfiniteScrollElement | null;

    if (target?.complete) {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const moreVentas = ventas.slice(startIndex, endIndex);
      setDisplayedVentas((prevVentas) => [...prevVentas, ...moreVentas]);
      setCurrentPage(nextPage);

      if (endIndex >= ventas.length) {
        target.complete();
        target.disabled = true;
      } else {
        target.complete();
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (error) {
    return (
      <IonAlert
        isOpen={!!error}
        onDidDismiss={() => setError("")}
        header="Error"
        message={error}
        buttons={["OK"]}
      />
    );
  }

  return (
    <div className="table-container">
      <IonTitle className="table-title">HISTORIAL DE VENTAS</IonTitle>
      <IonGrid>
        <div className="ventas-scroll">
          {/* Header de la tabla */}
          <IonRow className="header-row">
            <IonCol size="2" className="header-text">
              ID
            </IonCol>
            <IonCol size="4" className="header-text">
              Cliente
            </IonCol>
            <IonCol size="3" className="header-text">
              Fecha
            </IonCol>
            <IonCol size="3" className="header-text">
              Total
            </IonCol>
          </IonRow>

          {/* Contenido de la tabla */}
          {displayedVentas.map((venta, index) => (
            <IonRow
              key={venta.id}
              className={`data-row ${index % 2 === 0 ? "even" : "odd"}`}
            >
              <IonCol size="2" className="letrita">
                {venta.id}
              </IonCol>
              <IonCol
                size="4"
                className="letrita"
              >{`${venta.cliente.nombre} ${venta.cliente.apellido}`}</IonCol>
              <IonCol size="3" className="letrita">
                {new Date(venta.createdAt).toLocaleDateString()}
              </IonCol>
              <IonCol
                size="3"
                className="letrita"
              >{`₡${venta.monto_final.toLocaleString()}`}</IonCol>
            </IonRow>
          ))}
        </div>

        {/* Infinite Scroll */}
        <IonInfiniteScroll onIonInfinite={loadMoreVentas}>
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Cargando más ventas..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonGrid>
    </div>
  );
};

export default HistorialVentas;
