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
          <IonRow>
            <IonCol sizeXs="12" sizeSm="8" sizeMd="6" sizeLg="4" offsetSm="2" offsetMd="3" offsetLg="4">
              <IonImg
                src="../public/Farmapueblo.png"
                alt="The Wisconsin State Capitol building in Madison, WI at night"
                className='custom-image'>
              </IonImg>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol sizeXs="12" sizeSm="8" sizeMd="6" sizeLg="4" offsetSm="2" offsetMd="3" offsetLg="4">
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
            <IonCol sizeXs="12" sizeSm="8" sizeMd="6" sizeLg="4" offsetSm="2" offsetMd="3" offsetLg="4">
              <div className="password-item">
                <IonInput
                  type={showPassword ? 'text' : 'password'}
                  label="Contraseña"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder=""
                  className="password-input"
                />
                <IonButton
                  fill="clear"
                  className="password-toggle-button"
                  onClick={() => setShowPassword(!showPassword)}>
                  <IonIcon icon={showPassword ? eyeOff : eye} />
                </IonButton>
              </div>
            </IonCol>
          </IonRow>


          <IonRow>
            <IonCol sizeXs="12" sizeSm="6" offsetSm="3" sizeMd="4" offsetMd="4">
              <IonButton onClick={() => doLogin()} expand='full' className='ion-button' color="secondary" >
                Ingresar
              </IonButton>
            </IonCol>
            <IonCol sizeXs="12" sizeSm="6" offsetSm="3" sizeMd="4" offsetMd="4">
              <IonButton onClick={() => doRegistro()} expand='full' className='ion-button' color="secondary">
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