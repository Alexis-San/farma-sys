import { IonButton, IonImg, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import "../theme/Login.css"
import React, { useState } from 'react';
import { eyeOff, eye } from 'ionicons/icons';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [showPassword, setShowPassword] = useState(false);

  const doRegistro = () => {
    navigation.push('/Registro', 'forward', 'replace');
  }

  const doLogin = () => {
    navigation.push('/menu', 'forward', 'replace');
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle >LOGIN</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent >
        <IonGrid  >

          <IonImg
            src="../public/Presentacion.png"
            alt="The Wisconsin State Capitol building in Madison, WI at night"
            className='custom-image'></IonImg>

          <IonRow>
  <IonCol size="4" offset="4">
    <IonInput 
      label="Usuario" 
      labelPlacement="floating" 
      fill="outline" 
      placeholder=""
      className="ion-input"
    />
  </IonCol>
</IonRow>

<IonRow>
  <IonCol size="4" offset="4">
    <div className="password-item">
      <IonInput
        type={showPassword ? 'text' : 'password'}
        label="Contraseña"
        labelPlacement="floating"
        fill="outline"
        placeholder=""
        color="dark"
        className="password-input"
      />
      <IonButton 
        fill="clear" 
        className="password-toggle-button" 
        onClick={() => setShowPassword(!showPassword)} >
        <IonIcon icon={showPassword ? eyeOff : eye} />
      </IonButton>
    </div>
  </IonCol>
</IonRow>


          <IonRow>
            <IonCol size='2' offset='4'>
              <IonButton onClick={() => doLogin()} expand='full' className='ion-button' >
                Ingresar
              </IonButton>
            </IonCol>
            <IonCol size='2'>
              <IonButton onClick={() => doRegistro()} expand='full' className='ion-button'>
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