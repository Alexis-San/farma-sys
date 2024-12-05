import React, { useState, useEffect } from "react";
import { IonCard, IonCardContent, IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const PanelControl: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("diciembre");
  const [salesData, setSalesData] = useState<any[]>([]);

  // Aquí puedes hacer una solicitud a tu API para obtener los datos
  useEffect(() => {
    const fetchSalesData = async () => {
      const response = await fetch("http://localhost:8000/api/informes/montos-tres-meses");
      const data = await response.json();
      setSalesData(data.montos);
    };

    fetchSalesData();
  }, []);

  // Encuentra el monto correspondiente al mes seleccionado
  const selectedData = salesData.find(item => item.mes === selectedMonth);

  return (
    <IonCard>
      <IonCardContent>
        <h2>Total de Ventas</h2>
        {/* Segmento para elegir el mes */}
        <IonSegment
          value={selectedMonth}
          onIonChange={(e) => setSelectedMonth(e.detail.value as string)} // Asegura que sea string
        >
          {salesData.map((item, index) => (
            <IonSegmentButton key={index} value={item.mes}>
              <IonLabel>{item.mes}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        {/* Muestra el monto del mes seleccionado */}
        <p>{`₡${selectedData ? selectedData.total.toFixed(2) : 0.0}`}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default PanelControl;


