import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import RegistroView from "../components/RegistroView";

const Registro: React.FC = () => {
    const navigation = useIonRouter();

  const contenidomodal =  
  (<div>
    <h3 > Sus datos fueron correctamente ingresados!</h3>
    <IonButton onClick={()=>goLogin()}>Iniciar Sesion</IonButton>
  </div>);

  const goLogin =() => {
    navigation.push('/','forward','replace');
}
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle >Registro</IonTitle>
            </IonToolbar>
          </IonHeader>
          
          <IonContent >
         
            <RegistroView contenido={contenidomodal} />
         
          
          </IonContent>
        </IonPage>
      );
  };
  
  export default Registro;
  