import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "../../theme/ventas.css";

Chart.register(...registerables);

const GraficaVentas: React.FC = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const chartRef = useRef<Chart<"bar", number[], string> | null>(null);
  const chartCircularRef = useRef<Chart<"pie", number[], string> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCircularRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Realizamos la solicitud a la API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/informes/top-productos");
        const data = await response.json();
        if (data.ok) {
          setProductos(data.productos);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la API", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (productos.length === 0) return; // Esperamos a tener los datos antes de graficar

    // Grafico de barras (Ventas por mes)
    if (chartRef.current) chartRef.current.destroy();
    if (canvasRef.current) {
      chartRef.current = new Chart<"bar", number[], string>(canvasRef.current, {
        type: "bar",
        data: {
          labels: ["Enero", "Febrero", "Marzo"], // Aquí puedes cambiar por datos reales si los tienes
          datasets: [
            {
              label: "Ventas",
              data: [500, 1000, 750], // Cambia esto por datos dinámicos si es necesario
              backgroundColor: ["#3b82f6", "#22c55e", "#ef4444"],
            },
          ],
        },
        options: {
          plugins: {
            title: { display: true, text: "Ventas por Mes" },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // Grafico Circular (Productos más vendidos)
    if (chartCircularRef.current) chartCircularRef.current.destroy();
    if (canvasCircularRef.current) {
      const labels = productos.map((producto) => `Producto ${producto.id_producto_inventario}`);
      const data = productos.map((producto) => parseInt(producto.total_vendido));
      
      chartCircularRef.current = new Chart<"pie", number[], string>(canvasCircularRef.current, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Productos Más Vendidos",
              data: data,
              backgroundColor: ["#f97316", "#14b8a6", "#9333ea"],
            },
          ],
        },
        options: {
          plugins: {
            title: { display: true, text: "Productos Más Vendidos" },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      if (chartCircularRef.current) {
        chartCircularRef.current.destroy();
        chartCircularRef.current = null;
      }
    };
  }, [productos]);

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="chart-wrapper">
        <canvas ref={canvasCircularRef}></canvas>
      </div>
    </div>
  );
};

export default GraficaVentas;
