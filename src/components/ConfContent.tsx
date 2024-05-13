import { IonButton, IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import RegistroView from "./RegistroView";
import { useState } from "react";



const ConfContent: React.FC = ( ) => {
    const [editar,setEditar]=useState(true);  //para usar el valor y editar el valor (estados)
    
    const contenidomodal =  
  (<div>
    <h3 > Sus datos fueron correctamente modificados</h3>
  </div>);

  
  return (
    <IonGrid>
    <IonRow >
                <IonCol  size="4" offset="4" >
                <IonImg
      src="../../resources/user.png"
      alt="Imagen de usuario"
    ></IonImg>
                </IonCol>
            </IonRow>
      <RegistroView noEditable={editar} contenido={contenidomodal}/>
      <IonRow>
        <IonCol>
            <IonButton onClick={()=>setEditar(!editar)}>Modificar datos</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>

  );
};

export default ConfContent;
