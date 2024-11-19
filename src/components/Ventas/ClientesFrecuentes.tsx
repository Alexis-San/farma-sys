import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import "../../theme/ventas.css";

const ClientesFrecuentes: React.FC = () => {
  const customers = [
    { id: 1, name: "Juan Pérez", totalPurchases: 5, totalSpent: 2500.0 },
    { id: 2, name: "María López", totalPurchases: 3, totalSpent: 1500.0 },
  ];

  return (
    <IonGrid>
      {/* Header de la tabla */}
      <IonRow className="header-row">
        <IonCol size="4"><strong>Nombre</strong></IonCol>
        <IonCol size="4"><strong>Compras</strong></IonCol>
        <IonCol size="4"><strong>Total Gastado</strong></IonCol>
      </IonRow>
      {/* Contenido de la tabla */}
      {customers.map((customer, index) => (
        <IonRow key={customer.id} className={`data-row ${index % 2 === 0 ? "even" : "odd"}`}>
          <IonCol size="4" className="letrita">{customer.name}</IonCol>
          <IonCol size="4" className="letrita">{customer.totalPurchases}</IonCol>
          <IonCol size="4" className="letrita">{`₡${customer.totalSpent.toFixed(2)}`}</IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default ClientesFrecuentes;
