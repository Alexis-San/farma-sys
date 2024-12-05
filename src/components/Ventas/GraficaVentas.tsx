import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "../../theme/ventas.css";

Chart.register(...registerables);

const GraficaVentas: React.FC = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [inventario, setInventario] = useState<any[]>([]);
  const chartCircularRef = useRef<Chart<"pie", number[], string> | null>(null);
  const canvasCircularRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Solicitar datos de productos más vendidos
        const responseProductos = await fetch("http://localhost:8000/api/informes/top-productos");
        const dataProductos = await responseProductos.json();

        // Solicitar inventario
        const responseInventario = await fetch("http://localhost:8000/api/inventario");
        const dataInventario = await responseInventario.json();

        if (dataProductos.ok) {
          setProductos(dataProductos.productos);
          setInventario(dataInventario);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la API", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (productos.length === 0 || inventario.length === 0) return; // Esperar los datos

    // Gráfico Circular (Productos más vendidos y stock)
    if (chartCircularRef.current) chartCircularRef.current.destroy();
    if (canvasCircularRef.current) {
      const labels = productos.map((producto) => {
        const inventarioProducto = inventario.find(
          (inv) => inv.id === producto.id_producto_inventario
        );
        return `${inventarioProducto?.producto.nombre_comercial || "Producto"}`;
      });

      const data = productos.map((producto) => parseInt(producto.total_vendido));

      chartCircularRef.current = new Chart<"pie", number[], string>(canvasCircularRef.current, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Productos Más Vendidos",
              data: data,
              backgroundColor: ["#f97316", "#14b8a6", "#9333ea"], // Puedes personalizar los colores
            },
          ],
        },
        options: {
          plugins: {
            title: { display: true, text: "Productos Más Vendidos" },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const datasetLabel = tooltipItem.dataset.label || "";
                  const { label } = tooltipItem;
                  const sold = tooltipItem.raw as number;

                  // Buscar el inventario correspondiente
                  const inventarioProducto = inventario.find(
                    (inv) => inv.id === productos[tooltipItem.dataIndex].id_producto_inventario
                  );
                  const stock = inventarioProducto?.stock || 0;

                  return `Total Vendido: ${sold}, En Stock: ${stock}`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // Cleanup
    return () => {
      if (chartCircularRef.current) {
        chartCircularRef.current.destroy();
        chartCircularRef.current = null;
      }
    };
  }, [productos, inventario]);

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <canvas ref={canvasCircularRef}></canvas>
      </div>
    </div>
  );
};

export default GraficaVentas;
