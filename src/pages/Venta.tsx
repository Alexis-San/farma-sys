import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CustomPage from '../components/CustomPage';


const Venta: React.FC = () => {
  return (
     <CustomPage titulo='Ventas' contenido={<ExploreContainer/>}/>
  );
};

export default Venta;
