import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "../../theme/ventas.css";

Chart.register(...registerables);

const GraficaVentas: React.FC = () => {
  const chartRef = useRef<Chart<"bar", number[], string> | null>(null);
  const chartCircularRef = useRef<Chart<"pie", number[], string> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCircularRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
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
            title: { display: true, text: "Ventas por Mes" },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    if (chartCircularRef.current) chartCircularRef.current.destroy();
    if (canvasCircularRef.current) {
      chartCircularRef.current = new Chart<"pie", number[], string>(canvasCircularRef.current, {
        type: "pie",
        data: {
          labels: ["Producto A", "Producto B", "Producto C"],
          datasets: [
            {
              label: "Productos Más Vendidos",
              data: [50, 30, 20],
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
