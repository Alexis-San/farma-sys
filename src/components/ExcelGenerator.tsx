import { IonButton, IonIcon } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import * as XLSX from "xlsx";
import axios from "axios";

// Define una interfaz para los productos en el inventario
interface Producto {
  id: number;
  nombre_comercial: string;
  condicion_venta: string;
}

interface InventarioItem {
  id: number;
  stock: number;
  lote: string;
  precio_venta: number;
  precio_compra: number;
  fecha_vencimiento: string; // O una fecha si es un objeto Date
  producto?: Producto;
}

const ExportarStockBajo = () => {
  // Función para generar el archivo Excel con productos de stock bajo
  const generarExcelStockBajo = async () => {
    try {
      // Obtener los datos del inventario desde la API
      const response = await axios.get("http://localhost:8000/api/inventario/");
      const inventario: InventarioItem[] = response.data; // Tipar la respuesta

      // Filtrar productos con stock bajo
      const stockBajo = inventario.filter((item) => item.stock < 5);

      // Formatear los datos para el archivo Excel
      const datosExcel = stockBajo.map((item) => ({
        ID: item.id,
        Nombre: item.producto?.nombre_comercial || "N/A",
        Stock: item.stock,
        Lote: item.lote,
        "Precio Venta": item.precio_venta,
        "Precio Compra": item.precio_compra,
        Vencimiento: new Date(item.fecha_vencimiento).toLocaleDateString(),
        "Condición Venta": item.producto?.condicion_venta || "N/A",
      }));

      // Crear el libro y la hoja de Excel
      const worksheet = XLSX.utils.json_to_sheet(datosExcel);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Bajo");

      // Exportar el archivo Excel
      XLSX.writeFile(workbook, "Productos_Stock_Bajo.xlsx");
      alert("Archivo generado exitosamente.");
    } catch (error) {
      console.error("Error al generar el Excel:", error);
      alert("Hubo un error al generar el archivo.");
    }
  };

  return (
    <IonButton color="secondary" onClick={generarExcelStockBajo}>
      <IonIcon slot="start" icon={downloadOutline} />
      Exportar Stock Bajo
    </IonButton>
  );
};

export default ExportarStockBajo;


