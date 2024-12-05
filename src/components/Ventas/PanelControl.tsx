import React, { useState, useEffect } from "react";
import { IonCard, IonCardContent, IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import "../../theme/ventas.css"; // Asegúrate de enlazar este archivo de estilos

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
    <IonCard className="panel-card">
      <IonCardContent className="panel-content">
        <h2 className="title">TOTAL DE VENTAS</h2>
        <h3 className="title">ULTIMO 3 MESES</h3>
        <IonSegment
          value={selectedMonth}
          onIonChange={(e) => setSelectedMonth(e.detail.value as string)}
          className="month-selector"
        >
          {salesData.map((item, index) => (
            <IonSegmentButton key={index} value={item.mes} className="segment-button">
              <IonLabel className="segment-label">{item.mes.toUpperCase()}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        <div className="sales-total">
          
          <p className="total-amount">{selectedData ? selectedData.total: " 0 "}</p>
          <p className="currency-symbol1">"</p>
          <p className="currency-symbol"> Gs.</p>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default PanelControl;



