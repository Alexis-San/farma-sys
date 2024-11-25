import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import CustomPage from '../components/CustomPage';
import '../theme/Inventario.css'; // Para estilos personalizados

const Inventario: React.FC = () => {
  const router = useIonRouter();

  // Datos para los IonCards
  const cards = [
    { title: 'Actuador', className: 'card-red' },
    { title: 'Categorias', className: 'card-yellow' },
    { title: 'Clientes', className: 'card-green' },
    { title: 'Inventario', className: 'card-blue' },
    { title: 'Laboratorios', className: 'card-purple' },
    { title: 'Productos', className: 'card-teal' },
    { title: 'Proveedores', className: 'card-light-red' },
    { title: 'Usuarios', className: 'card-orange' },
  ];


  return (
    <IonPage>
      <IonHeader>
        <CustomPage titulo='Productos' searchbar contenido={undefined} cartItemCount={''} />
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="card-grid">
          {cards.map((card, index) => (
            <IonCard
              key={index}
              className={`clickable-card ${card.className}`}
              onClick={() => router.push('/busqueda-avanzada')}
            >
              <IonCardContent className="card-content">
                {card.title}
              </IonCardContent>
            </IonCard>


          ))}
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Inventario;

