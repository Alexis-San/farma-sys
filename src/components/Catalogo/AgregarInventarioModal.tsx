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
import { ProductoType } from "../../types/InventarioType";

interface AgregarInventarioModalProps {
  isOpen: boolean;
  productoSeleccionado: ProductoType | null;
  inventario: {
    stock: number;
    lote: string;
    precio_venta: number;
    precio_compra: number;
    fecha_vencimiento: string;
    productoId: number;
  };
  onClose: () => void;
  onChange: (e: CustomEvent) => void;
  onGuardar: () => void;
}

const AgregarInventarioModal: React.FC<AgregarInventarioModalProps> = ({
  isOpen,
  productoSeleccionado,
  inventario,
  onClose,
  onChange,
  onGuardar,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar al Inventario</IonTitle>
          <IonButton slot="end" onClick={onClose}>
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {productoSeleccionado && (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Producto Seleccionado</IonLabel>
                  <IonInput
                    value={productoSeleccionado.nombre_comercial}
                    readonly
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Stock</IonLabel>
                  <IonInput
                    type="number"
                    name="stock"
                    value={inventario.stock}
                    onIonChange={onChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Lote</IonLabel>
                  <IonInput
                    name="lote"
                    value={inventario.lote}
                    onIonChange={onChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Precio Venta</IonLabel>
                  <IonInput
                    type="number"
                    name="precio_venta"
                    value={inventario.precio_venta}
                    onIonChange={onChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Precio Compra</IonLabel>
                  <IonInput
                    type="number"
                    name="precio_compra"
                    value={inventario.precio_compra}
                    onIonChange={onChange}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">
                    Fecha Vencimiento (dd/mm/yyyy)
                  </IonLabel>
                  <IonInput
                    name="fecha_vencimiento"
                    value={inventario.fecha_vencimiento
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                    onIonChange={onChange}
                    placeholder="dd/mm/yyyy"
                  />
                </IonItem>
                <IonButton expand="full" onClick={onGuardar}>
                  Guardar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonModal>
  );
};

export default AgregarInventarioModal;