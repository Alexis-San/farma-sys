import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { InventarioType } from "../../types/InventarioType";

interface ModificarInventarioModalProps {
  isOpen: boolean;
  inventarioSeleccionado: InventarioType | null;
  onClose: () => void;
  onGuardarM: () => void;
  onChange: (e: CustomEvent) => void;
}

const ModificarInventarioModal: React.FC<ModificarInventarioModalProps> = ({
  isOpen,
  inventarioSeleccionado,
  onClose,
  onChange,
  onGuardarM
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Modificar Inventario</IonTitle>
          <IonButton slot="end" onClick={onClose}>
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {inventarioSeleccionado && (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Producto</IonLabel>
                  <IonInput
                    value={inventarioSeleccionado.producto?.nombre_comercial}
                    readonly
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Stock</IonLabel>
                  <IonInput
                    type="number"
                    name="stock"
                    value={inventarioSeleccionado.stock}
                    onIonChange={onChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Lote</IonLabel>
                  <IonInput
                    name="lote"
                    value={inventarioSeleccionado.lote}
                    onIonChange={onChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Precio Venta</IonLabel>
                  <IonInput
                    type="number"
                    name="precio_venta"
                    value={inventarioSeleccionado.precio_venta}
                    onIonChange={onChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Precio Compra</IonLabel>
                  <IonInput
                    type="number"
                    name="precio_compra"
                    value={inventarioSeleccionado.precio_compra}
                    onIonChange={onChange}
                  />
                </IonItem>
                <IonButton expand="full" onClick={onGuardarM}>
                  Guardar Cambios
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonModal>
  );
};

export default ModificarInventarioModal;