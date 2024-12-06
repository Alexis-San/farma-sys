import { IonButton, IonCard, IonCardContent, IonCardHeader, IonImg, IonText, IonBadge } from '@ionic/react';
import styles from '../sccs/ProductoView.module.scss';
import { addToCart } from '../store/CarritoStore'; 
import React, { useState, useRef } from 'react';

interface Producto {
  id: number; 
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  quantity: number;
}

interface ProdViewProps {
  producto: Producto; 
}

const ProdView: React.FC<ProdViewProps> = ({ producto }) => {
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
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = setTimeout(() => setHover(true), 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setHover(false);
  };

  const handleClick = () => {
    setHover((prevHover) => !prevHover); // Alterna el estado de hover
  };

  return (
    <IonCard
      className={styles.productoCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick} // Maneja el clic en dispositivos móviles
    >
      <IonCardHeader>
        <IonImg src={producto.imagen} alt={producto.nombre} className={styles.productoImg} />
      </IonCardHeader>
      <IonCardContent className={styles.productoContent}>
        <IonText>
          <h2>{producto.nombre}</h2>
          <p>₲ {producto.precio}</p>
          <p>Stock: {producto.stock || 'No disponible'}</p>
        </IonText>
        {producto.stock && producto.stock < 10 && (
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
