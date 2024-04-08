import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';


const Conf: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
          <IonButton slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButton>
            <IonTitle>Configuración</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          
        </IonContent>
      </IonPage>
    );
  };
  
  export default Conf;