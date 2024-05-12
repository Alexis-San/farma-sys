import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './login.css';

const Login: React.FC = () => {
const navigation = useIonRouter();

const doLogin =() => {
    navigation.push('/menu','forward','replace');
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle class="centrado">Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent >
      <IonGrid color='white' >
        <IonRow>
          <IonCol class="prueba" >1</IonCol>
          <IonCol size="4">
            <br />

            <br />

            <IonInput label="Usuario" labelPlacement="floating" fill="outline" placeholder="Texto"></IonInput>

            <br />

            <IonInput label="Contraseña" labelPlacement="floating" fill="outline" placeholder="Texto" color="dark"></IonInput>

            <br />

            <IonButton onClick={() => doLogin()} expand='full' color="primary">
             Ingresar
            </IonButton>
          </IonCol>
          <IonCol class="prueba" >Holaaaaa</IonCol>
        </IonRow>
      </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Login;