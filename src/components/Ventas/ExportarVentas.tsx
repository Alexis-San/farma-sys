import React from "react";
import { IonButton } from "@ionic/react";
import * as XLSX from "xlsx";

const ExportarVentas: React.FC = () => {
  const salesHistory = [
    { id: 1, customer: "Juan Pérez", date: "2024-11-18", total: 500.0 },
    { id: 2, customer: "María López", date: "2024-11-19", total: 750.0 },
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(salesHistory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
    XLSX.writeFile(workbook, "HistorialVentas.xlsx");
  };

  return <IonButton onClick={exportToExcel}>Exportar a Excel</IonButton>;
};

export default ExportarVentas;
