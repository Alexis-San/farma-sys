
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonImg, IonText, IonBadge} from '@ionic/react';
import styles from '../sccs/ProductoView.module.scss';
import { addToCart } from '../store/CarritoStore'; // Importa la función para agregar al carrito
import React, { useState, useRef } from 'react';

interface Producto {
  id: number; // Asegúrate de que el producto tenga un ID único
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  quantity: number;
}

interface ProdViewProps {
  producto: Producto; // Cambia a singular
}

const ProdView: React.FC<ProdViewProps> = ({ producto }) => {
  console.log(producto); // Verifica qué datos estás recibiendo

  const [hover, setHover] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAddToCart = () => {
    const productToAdd = {
      id: producto.id,
      title: producto.nombre,
      price: producto.precio,
      image: producto.imagen,
      stock: producto.stock,
      quantity: producto.quantity
    };
    addToCart(productToAdd); // Agrega el producto al carrito
  };

  const handleMouseEnter = () => {
    // Limpiamos el timeout anterior si existe
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = setTimeout(() => setHover(true), 500); // 300ms de espera antes de activar el hover
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current); // Limpiamos el timeout
    }
    setHover(false); // Desactivamos el hover inmediatamente
  };

  return (
  <IonCard className={styles.productoCard} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
  <IonCardHeader>
    <IonImg src={producto.imagen} alt={producto.nombre} className={styles.productoImg} />
  </IonCardHeader>
  <IonCardContent className={styles.productoContent}>
    <IonText>
      <h2>{producto.nombre}</h2>
      <p>₲ {producto.precio}</p>
      <p>Stock: {producto.stock || 'No disponible'}</p>
    </IonText>
    {/* Badge para indicar stock bajo */}
    {producto.stock && producto.stock < 10 && (  /// STOCK BAJO INDICADOR///////
      <IonBadge color="warning" className={styles.lowStockBadge}>
        Stock bajo
      </IonBadge>
    )}
    {hover && (
      <IonButton expand="block" color="success" onClick={handleAddToCart}>
        Agregar al carrito
      </IonButton>
    )}
  </IonCardContent>
</IonCard>

  );
};


export default ProdView;
  