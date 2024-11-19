import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import "../../theme/ventas.css";

const HistorialVentas: React.FC = () => {
  const salesHistory = [
    { id: 1, customer: "Juan Pérez", date: "2024-11-18", total: 500.0 },
    { id: 2, customer: "María López", date: "2024-11-19", total: 750.0 },
  ];

  return (
    <IonGrid>
      {/* Header de la tabla */}
      <IonRow className="header-row">
        <IonCol size="2"><strong>ID</strong></IonCol>
        <IonCol size="4"><strong>Cliente</strong></IonCol>
        <IonCol size="3"><strong>Fecha</strong></IonCol>
        <IonCol size="3"><strong>Total</strong></IonCol>
      </IonRow>
      {/* Contenido de la tabla */}
      {salesHistory.map((sale, index) => (
        <IonRow key={sale.id} className={`data-row ${index % 2 === 0 ? "even" : "odd"}`}>
          <IonCol size="2" className="letrita" >{sale.id}</IonCol>
          <IonCol size="4" className="letrita" >{sale.customer}</IonCol>
          <IonCol size="3" className="letrita" >{sale.date}</IonCol>
          <IonCol size="3"className="letrita" >{`₡${sale.total.toFixed(0)}`}</IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default HistorialVentas;

