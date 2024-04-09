import { IonButton, IonCheckbox, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
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
          <IonTitle>Iniciar Sesion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <form className="block">
      <IonItem>
        <IonLabel position="floating">Usuario</IonLabel>
        <IonInput />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Contrasenha</IonLabel>
        <IonInput type="password" />
      </IonItem>
      </form>
      <IonContent className='ion-padding'>
       <IonButton onClick={() => doLogin()} expand='block'>
        Iniciar
       </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;