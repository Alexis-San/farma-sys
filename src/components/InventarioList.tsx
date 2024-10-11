import { IonActionSheet, IonButton, IonCol, IonGrid, IonIcon, IonRow, IonText } from "@ionic/react";
import { InventarioType } from "../types/InventarioType";
import './InventarioList.css'
import { useState } from "react";
import { createOutline } from "ionicons/icons";

interface InventarioListProps {
    data: InventarioType []
  }
  
  
  const InventarioList : React.FC<InventarioListProps> = (props ) => {
   const [ocultar,setOcultar]=useState(false) 
    return (

    <IonGrid className="tabla">
        <IonActionSheet
        isOpen={ocultar}
        header="Actions"
        buttons={[
          {
            text: 'Agregar',
            
            data: {
              action: 'Agregar',
            },
          },
          {
            text: 'Modificar',
            data: {
              action: 'Modificar',
            },
          },
          {
            text: 'Eliminar',
            data: {
              action: 'Eliminar',
            },
          },
          {
            text: 'Cancelar',
            data: {
              action: 'Cancelar',
            },
          },
        ]}
      ></IonActionSheet>
        <IonRow className="encabezado" color="primary">
         <IonCol>ID</IonCol>   
         <IonCol>Descripcion</IonCol>   
         <IonCol>Precio Compra</IonCol>   
         <IonCol>Precio Venta</IonCol>   
         <IonCol>Vencimiento</IonCol>   
         <IonCol>Stock</IonCol>   
         <IonCol>Lote</IonCol>   
         <IonCol>Acciones</IonCol>   
         
        </IonRow>
            {(props.data)?.map((valor)=>
            (
                <IonRow>
                 <IonCol><IonText>{valor.id_producto_inventario}</IonText></IonCol>   
                 <IonCol><IonText>{valor.descripcion}</IonText></IonCol>   
                 <IonCol><IonText>{valor.precio_compra}</IonText></IonCol>   
                 <IonCol><IonText>{valor.precio_venta}</IonText></IonCol>   
                 <IonCol><IonText>{valor.fecha_vencimiento}</IonText></IonCol>   
                 <IonCol><IonText>{valor.stock}</IonText></IonCol>   
                 <IonCol><IonText>{valor.lote}</IonText></IonCol> 
                 <IonCol><IonButton onClick={()=>setOcultar(!ocultar)}><IonIcon icon={createOutline}></IonIcon></IonButton></IonCol>   
                 
                </IonRow>
            ))}
    </IonGrid>
    );
  };
  
  export default InventarioList;
  