import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './tab4.css';

const Tab4: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
          <IonButton slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButton>
            <IonTitle>Tab 4</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 4</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name="Tab 4 page" />
        </IonContent>
      </IonPage>
    );
  };
  
  export default Tab4;