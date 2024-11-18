import { IonButton, IonCol, IonGrid, IonInput, IonRow, useIonRouter } from "@ionic/react";
import CustomModal from "./CustomModal";
import React, { ReactNode } from "react";
import "../theme/conf.css";

interface RegistroProps {
    registroAction?: void,
    noEditable?: boolean | false,
    contenido : ReactNode
  }
const RegistroView: React.FC <RegistroProps>= (props) => {

    return (
    
        < >
       
        <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Usuario" labelPlacement="floating" fill="outline" placeholder="" disabled={props.noEditable} className="letras"></IonInput><br />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Gmail" labelPlacement="floating" fill="outline" placeholder=""  disabled={props.noEditable} className="letras"></IonInput><br/>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Telefono" labelPlacement="floating" fill="outline" placeholder="" disabled={props.noEditable} className="letras"></IonInput><br />
          </IonCol>
        </IonRow>
       
     
        {

          (!props.noEditable)&&(
            <>
             <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Contraseña" labelPlacement="floating" fill="outline" placeholder="" className="letras"></IonInput><br />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Confirmar Contraseña" labelPlacement="floating" fill="outline" placeholder="" className="letras"></IonInput><br />
          </IonCol>
        </IonRow>
           
            <IonRow>
            <IonCol size='2' offset='5'>
            <IonButton id="RegistroButton" onClick={()=>props.registroAction} expand='full'className="modificar-button">
               Aceptar
              </IonButton>
            </IonCol>
              <CustomModal titulomodal="Accion Exitosa!!" contentmodal={props.contenido} triggerId="RegistroButton"/>
          </IonRow> </>
          )

        }
      </>

        
        
      
    );
  };
  
  export default RegistroView;
  