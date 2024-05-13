import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CustomPage from '../components/CustomPage';


const Inventario: React.FC = () => {
  return (
   
      <CustomPage titulo='Inventario' contenido={<ExploreContainer/>} searchbar/>
    
  );
};

export default Inventario;
