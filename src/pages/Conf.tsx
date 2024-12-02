import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CustomPage from '../components/CustomPage';
import ConfContent from '../components/ConfContent';


const Conf: React.FC = () => {
    return (
      <CustomPage titulo='Configuración' contenido={<ConfContent/>}  />
    );

    
  };
  
  export default Conf;