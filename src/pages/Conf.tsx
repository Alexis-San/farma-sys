import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CustomPage from '../components/CustomPage';


const Conf: React.FC = () => {
    return (
      <CustomPage titulo='Configuración' contenido={<ExploreContainer/>}/>
    );
  };
  
  export default Conf;