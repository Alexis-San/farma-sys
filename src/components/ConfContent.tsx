import { IonButton, IonAvatar, IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import RegistroView from "./RegistroView";
import { useState } from "react";
import "../theme/conf.css";

const ConfContent: React.FC = () => {
  const [editar, setEditar] = useState(true); // para usar el valor y editar el valor (estados)

  const contenidomodal = (
    <div>
      <h3>Sus datos fueron correctamente modificados</h3>
    </div>
  );

  return (
    <>
      <IonGrid fixed={true}>
        <IonRow>
          <IonCol size="4" offset="4">
            <div className="avatar-container">
              <IonAvatar className="avatar-large">
                <img src="../public/neni.jpg" alt="Avatar" />
              </IonAvatar>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonGrid>
        <IonRow>
          <IonCol size="4" offset="4">
            <IonButton onClick={() => setEditar(!editar)} className="modificar-button">
              Modificar datos
            </IonButton>
          </IonCol>
        </IonRow>
        <RegistroView noEditable={editar} contenido={contenidomodal} />
      </IonGrid>
    </>
  );
};

export default ConfContent;

