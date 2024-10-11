import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CustomPage from '../components/CustomPage';


const Inicio: React.FC = () => {
  return (
    <CustomPage titulo='Inicio' contenido={<ExploreContainer />} searchbar/>
  );
};

export default Inicio;
