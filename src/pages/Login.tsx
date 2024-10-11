import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';

const Login: React.FC = () => {
const navigation = useIonRouter();

const doRegistro =() => {
  navigation.push('/Registro','forward','replace');
}

const doLogin =() => {
    navigation.push('/menu','forward','replace');
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle >Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent >
      <IonGrid  >
        <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Usuario" labelPlacement="floating" fill="outline" placeholder=""></IonInput>
          </IonCol>

        </IonRow>
        <IonRow>
          <IonCol size="4" offset='4' >
          <IonInput label="Contraseña" labelPlacement="floating" fill="outline" placeholder="" color="dark"></IonInput>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size='2' offset='4'>
          <IonButton onClick={() => doLogin()} expand='full' color="primary">
             Ingresar
            </IonButton>
          </IonCol>
          <IonCol size='2'>
          <IonButton onClick={() => doRegistro()} expand='full' color="primary">
             Registro
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Login;