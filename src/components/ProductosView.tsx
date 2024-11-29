import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner } from '@ionic/react';
import ProdView from './ProdView';
import axios from 'axios'; // Asegúrate de tener Axios instalado

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descuento?: number;
  oferta?: boolean;
  cantidad: number;
}

const ProductosView: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/inventario/');
        const productosAdaptados = response.data.map((item: any) => ({
          id: item.id,
          nombre: item.producto.nombre_comercial,
          precio: item.precio_venta,
          imagen: 'https://via.placeholder.com/150', // Reemplaza con imágenes reales si están disponibles
          descuento: item.estado ? 10 : 0, // Ejemplo de descuento basado en el estado
          oferta: item.estado,
          cantidad: item.stock || 1,
        }));
        setProductos(productosAdaptados);
      } catch (error) {
        console.error('Error fetching productos:', error);
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos en Oferta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {productos.map((producto) => (
            <ProdView key={producto.id} producto={producto} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductosView;
