import { IonIcon, IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { ReactElement, ReactNode, useRef } from "react";
import "./CustomModal.css"


interface CustomModalProps{
    triggerId: string,
    titulomodal: string,
    contentmodal: ReactNode 
    
}

const CustomModal: React.FC<CustomModalProps> = (props) => {
    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
      modal.current?.dismiss();
    }
    return (

        <IonModal id="example-modal" ref={modal} trigger={props.triggerId}>
        <div className="wrapper">
          <h1>{props.titulomodal}</h1>
          <div>{props.contentmodal}</div>
        </div>
      </IonModal>
    );

    
  };
  
  export default CustomModal;