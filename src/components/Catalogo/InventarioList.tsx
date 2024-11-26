import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { InventarioType } from "../../types/InventarioType";
import { createOutline, trashOutline, addCircleOutline } from "ionicons/icons";
import { useState } from "react";

interface InventarioListProps {
  data: InventarioType[];
}

const InventarioList: React.FC<InventarioListProps> = (props) => {
  // Handlers para acciones
  const handleAgregar = () => {
    console.log("Agregar producto");
  };

  const handleModificar = (id: number) => {
    console.log("Modificar producto con ID:", id);
  };

  const handleEliminar = (id: number) => {
    console.log("Eliminar producto con ID:", id);
  };

  return (
    <IonGrid className="tabla">
      {/* Botón Agregar */}
      <IonHeader>
        <IonToolbar>
          <IonButton
            onClick={handleAgregar}
            color="success"
            size="default"
            style={{ margin: "10px 0" }}
          >
            <IonIcon slot="start" icon={addCircleOutline} />
            Agregar Producto
          </IonButton>
        </IonToolbar>
      </IonHeader>

      {/* Encabezado */}
      <IonRow
        className="encabezado"
        style={{
          background: "#f0f0f0",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <IonCol size="1">ID</IonCol>
        <IonCol size="3">Descripción</IonCol>
        <IonCol size="2">Precio Compra</IonCol>
        <IonCol size="2">Precio Venta</IonCol>
        <IonCol size="2">Vencimiento</IonCol>
        <IonCol size="2">Acciones</IonCol>
      </IonRow>

      {/* Filas */}
      {props.data?.map((valor) => (
        <IonRow
          key={valor.id_producto_inventario}
          style={{
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <IonCol size="1">
            <IonText>{valor.id_producto_inventario}</IonText>
          </IonCol>
          <IonCol size="3">
            <IonText>{valor.descripcion}</IonText>
          </IonCol>
          <IonCol size="2">
            <IonText>{valor.precio_compra}</IonText>
          </IonCol>
          <IonCol size="2">
            <IonText>{valor.precio_venta}</IonText>
          </IonCol>
          <IonCol size="2">
            <IonText>{valor.fecha_vencimiento}</IonText>
          </IonCol>
          <IonCol size="2">
            {/* Botón Modificar */}
            <IonButton
              color="primary"
              size="small"
              onClick={() => handleModificar(valor.id_producto_inventario)}
            >
              <IonIcon slot="icon-only" icon={createOutline} />
            </IonButton>
            {/* Botón Eliminar */}
            <IonButton
              color="danger"
              size="small"
              onClick={() => handleEliminar(valor.id_producto_inventario)}
              style={{ marginLeft: "5px" }}
            >
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default InventarioList;
