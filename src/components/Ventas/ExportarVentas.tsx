import React, { useState, useEffect } from "react";
import { IonButton } from "@ionic/react";
import * as XLSX from "xlsx";

const ExportarVentas: React.FC = () => {
  const [ventas, setVentas] = useState<any[]>([]);

  // Función para obtener datos de la API
  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/informes/ventas/ultimo-mes"
        );
        const data = await response.json();
        if (data.ok) {
          setVentas(data.ventas);
        } else {
          console.error("Error al obtener ventas:", data);
        }
      } catch (error) {
        console.error("Error en la solicitud de ventas:", error);
      }
    };
    fetchVentas();
  }, []);

  // Función para exportar datos a Excel
  const exportToExcel = () => {
    // Mapea los datos de ventas para incluir solo lo relevante
    const formattedData = ventas.map((venta) => ({
      ID: venta.id,
      Cliente: `${venta.cliente.nombre} ${venta.cliente.apellido}`,
      CI: venta.cliente.ci,
      "Monto Final": venta.monto_final,
      Fecha: new Date(venta.createdAt).toLocaleDateString(),
    }));

    // Crea una hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");

    // Genera el nombre del archivo dinámico
    const now = new Date();
    const month = now.toLocaleString("es-ES", { month: "long" });
    const year = now.getFullYear();
    const fileName = `HistorialVentas${
      month.charAt(0).toUpperCase() + month.slice(1)
    }${year}.xlsx`;

    // Exporta el archivo
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <IonButton onClick={exportToExcel} disabled={ventas.length === 0}>
      Exportar a Excel
    </IonButton>
  );
};

export default ExportarVentas;
