import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js"; // Importa el registro de gráficos
import "../../theme/ventas.css";

// Asegúrate de registrar todos los controladores que vas a usar
Chart.register(...registerables);

const GraficaVentas: React.FC = () => {
  const chartRef = useRef<Chart<"bar", number[], string> | null>(null); // Especificar correctamente el tipo para el gráfico de barras
  const chartCircularRef = useRef<Chart<"pie", number[], string> | null>(null); // Especificar correctamente el tipo para el gráfico circular
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCircularRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Destruir el gráfico de barras existente antes de crear uno nuevo
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Crear el gráfico de barras (ventas por mes)
    if (canvasRef.current) {
      chartRef.current = new Chart<"bar", number[], string>(canvasRef.current, {
        type: "bar",
        data: {
          labels: ["Enero", "Febrero", "Marzo"],
          datasets: [
            {
              label: "Ventas",
              data: [500, 1000, 750],
              backgroundColor: ["#3b82f6", "#22c55e", "#ef4444"],
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Ventas por Mes", // Título del gráfico de barras
            },
          },
        },
      });
    }

    // Destruir el gráfico circular existente antes de crear uno nuevo
    if (chartCircularRef.current) {
      chartCircularRef.current.destroy();
    }

    // Crear el gráfico circular (productos más vendidos)
    if (canvasCircularRef.current) {
      chartCircularRef.current = new Chart<"pie", number[], string>(canvasCircularRef.current, {
        type: "pie",
        data: {
          labels: ["Producto A", "Producto B", "Producto C"], // Productos más vendidos
          datasets: [
            {
              label: "Productos Más Vendidos",
              data: [50, 30, 20], // Datos de ventas de cada producto
              backgroundColor: ["#f97316", "#14b8a6", "#9333ea"],
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Productos Más Vendidos", // Título del gráfico circular
            },
          },
        },
      });
    }

    // Limpiar los gráficos cuando se desmonte el componente
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
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="grafica-ventas"></canvas>
      <canvas ref={canvasCircularRef} className="grafica-productos"></canvas>
    </div>
  );
};

export default GraficaVentas;
