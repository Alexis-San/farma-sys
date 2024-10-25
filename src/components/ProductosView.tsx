import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ProdView from './ProdView';  // Asegúrate de que esta ruta sea correcta

const producto = [
  {
    nombre: 'La Roche Posay Effaclar Gel',
    precio: 174000,
    imagen: 'https://cdn.farmacenter.com.py/659286_1.jpg',  // Reemplaza con una URL válida
    descuento: 20,
    oferta: true
  },
  {
    nombre: 'Eau Thermale Avène Cicalfate',
    precio: 70950,
    imagen: 'https://cdn.farmacenter.com.py/224/665020.jpg',  // Reemplaza con una URL válida
    descuento: 35,
    oferta: true
  },
  {
    nombre: 'Gillette Prestobarba Ultragrip 2',
    precio: 7400,
    imagen: 'https://cdn.farmacenter.com.py/224/20590.jpg?v=1678452119',  // Reemplaza con una URL válida
    descuento: 0,
    oferta: false
  },
  {
    nombre: 'Pampers Premium Care Pañales',
    precio: 191850,
    imagen: 'https://cdn.farmacenter.com.py/224/666480.jpg',  // Reemplaza con una URL válida
    descuento: 20,
    oferta: true
  }
];

const ProductosView: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos en Oferta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {producto.map((producto, index) => (
            <ProdView key={index} producto={producto} />  // Cambia a singular
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductosView;