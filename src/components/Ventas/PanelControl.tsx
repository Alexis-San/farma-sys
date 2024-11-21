import React from "react";
import { IonCard, IonCardContent } from "@ionic/react";

const PanelControl: React.FC = () => {
  const totalSales = 2250.0; // Esto debería calcularse dinámicamente.

  return (
    <IonCard>
      <IonCardContent>
        <h2>Total de Ventas</h2>
        <p>{`₡${totalSales.toFixed(2)}`}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default PanelControl;
