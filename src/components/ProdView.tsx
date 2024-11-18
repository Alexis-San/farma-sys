import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonImg, IonText } from '@ionic/react';
import styles from '../sccs/ProductoView.module.scss';
import { addToCart } from '../store/CarritoStore'; // Importa la función para agregar al carrito

interface Producto {
  id: string; // Asegúrate de que el producto tenga un ID único
  nombre: string;
  precio: number;
  imagen: string;
  descuento?: number;
  oferta?: boolean;
  cantidad: number;
}

interface ProdViewProps {
  producto: Producto; // Cambia a singular
}

const ProdView: React.FC<ProdViewProps> = ({ producto }) => {
  const [hover, setHover] = useState(false);

  const handleAddToCart = () => {
    const productToAdd = {
      id: producto.id,
      title: producto.nombre,
      price: producto.precio,
      image: producto.imagen,
      quantity: producto.cantidad || 1
    };
    addToCart(productToAdd); // Agrega el producto al carrito
  };

  return (
    <IonCard 
      className={styles.productoCard} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      <IonCardHeader>
        {producto.oferta && <div className={styles.oferta}>Oferta {producto.descuento}%</div>}
        <IonImg src={producto.imagen} alt={producto.nombre} className={styles.productoImg} />
      </IonCardHeader>
      <IonCardContent className={styles.productoContent}>
        <IonText>
          <h2>{producto.nombre}</h2>
          <p>₲ {producto.precio}</p>
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
  