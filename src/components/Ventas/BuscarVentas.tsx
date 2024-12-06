import React, { useState, useEffect } from "react";
import { IonSearchbar, IonList, IonItem, IonLabel } from "@ionic/react";
import axios from "axios";

const BuscarVentas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [ventas, setVentas] = useState<any[]>([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      // Llamar a la API solo si hay un término de búsqueda
      const fetchVentas = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/informes/ventas/buscar/${searchTerm}`
          );
          setVentas(response.data.ventas); // Almacenar los resultados en el estado
        } catch (error) {
          console.error("Error fetching ventas:", error);
        }
      };

      fetchVentas();
    } else {
      setVentas([]); // Limpiar resultados si no hay término de búsqueda
    }
  }, [searchTerm]);

  return (
    <div>
      <IonSearchbar
        value={searchTerm}
        placeholder="Buscar ventas por ID o nombre de cliente..."
        onIonChange={(e) => setSearchTerm(e.detail.value!)}
      />
      <IonList>
        {ventas.map((venta) => (
          <IonItem key={venta.id}>
            <IonLabel>
              <h2>
                {venta.cliente.nombre} {venta.cliente.apellido}
              </h2>
              <p>ID Venta: {venta.id}</p>
              <p>Monto Final: {venta.monto_final}</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default BuscarVentas;
