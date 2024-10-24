import { IonButton, IonCol, IonGrid, IonInput, IonRow, useIonRouter } from "@ionic/react";
import CustomModal from "./CustomModal";
import React, { ReactNode } from "react";

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
            <IonInput label="Usuario" labelPlacement="floating" fill="outline" placeholder="" disabled={props.noEditable}></IonInput><br />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Gmail" labelPlacement="floating" fill="outline" placeholder=""  disabled={props.noEditable}></IonInput><br/>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Telefono" labelPlacement="floating" fill="outline" placeholder="" disabled={props.noEditable}></IonInput><br />
          </IonCol>
        </IonRow>
       
     
        {

          (!props.noEditable)&&(
            <>
             <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Contraseña" labelPlacement="floating" fill="outline" placeholder="" ></IonInput><br />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4" offset='4'>
            <IonInput label="Confirmar Contraseña" labelPlacement="floating" fill="outline" placeholder="" ></IonInput><br />
          </IonCol>
        </IonRow>
           
            <IonRow>
            <IonCol size='2' offset='5'>
            <IonButton id="RegistroButton" onClick={()=>props.registroAction} expand='full' color="primary">
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
  