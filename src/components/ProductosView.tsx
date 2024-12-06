import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from "@ionic/react";
import ProdView from "./ProdView";
import axios from "axios"; // Asegúrate de tener Axios instalado
import "../theme/Producto.css";
import "../../public/LOGO PARA APP.png";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descuento?: number;
  oferta?: boolean;
  stock: number;
  quantity: number;
}

// Función para formatear el nombre comercial y crear la URL de la imagen
const formatImagenUrl = (nombreComercial: string) => {
  return nombreComercial
    .toUpperCase()
    .replace(/ /g, "-")
    .replace(/[^A-Z0-9\-\.]/g, ""); // Elimina caracteres no alfanuméricos ni guiones
};

const ProductosView: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/inventario/"
        );
        const productosAdaptados = response.data.map((item: any) => {
          const imagenUrl = "LOGO PARA APP.png"; // Imagen generada dinámicamente

          return {
            id: item.id,
            nombre: item.producto.nombre_comercial,
            precio: item.precio_venta,
            imagen: imagenUrl, // Usa la URL formateada
            oferta: item.estado,
            stock: item.stock,
            //condicion_venta: item.producto.condicion_venta,
          };
        });
        setProductos(productosAdaptados);
      } catch (error) {
        console.error("Error fetching productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cargando productos...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonToolbar className="titulo">
        <IonTitle className="titulo">Productos Más Destacados</IonTitle>
      </IonToolbar>

      <IonContent>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {productos.map((producto) => (
            <ProdView key={producto.id} producto={producto} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductosView;
