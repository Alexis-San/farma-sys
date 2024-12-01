import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonImg, IonText } from '@ionic/react';
import styles from '../sccs/ProductoView.module.scss';
import { addToCart } from '../store/CarritoStore'; // Importa la función para agregar al carrito

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

  return (
    <IonCard className={styles.productoCard} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <IonCardHeader>
        <IonImg src={producto.imagen} alt={producto.nombre} className={styles.productoImg} />
      </IonCardHeader>
      <IonCardContent className={styles.productoContent}>
        <IonText>
          <h2>{producto.nombre}</h2>
          <p>₲ {producto.precio}</p>
          <p>Stock: {producto.stock || 'No disponible'}</p> {/* Aquí muestra un valor por defecto si stock está vacío */}
        </IonText>
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
  