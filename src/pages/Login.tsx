import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const Login: React.FC = () => {
const navigation = useIonRouter();

const doLogin =() => {
    navigation.push('/menu','forward','replace');
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
       <IonButton onClick={() => doLogin()} expand='full'>
        Login
       </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;