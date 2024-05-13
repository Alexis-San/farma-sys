import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CustomPage from '../components/CustomPage';
import InventarioList from '../components/InventarioList';
import { InventarioType } from '../types/InventarioType';


const Inventario: React.FC = () => {
  const data:InventarioType[]=[
    {id_producto_inventario: 1,
     descripcion:"Zatisfen",
     precio_compra:1200,
     precio_venta:1800,
     fecha_vencimiento: "12/05/22",
     lote:21,
     stock:3,
    },
    {id_producto_inventario: 2,
      descripcion:"Angripas Plus",
      precio_compra:2345,
      precio_venta:6782,
      fecha_vencimiento: "11/05/22",
      lote:21,
      stock:3,
     },
     {id_producto_inventario: 3,
      descripcion:"nlahn",
      precio_compra:1200,
      precio_venta:1800,
      fecha_vencimiento: "01/05/22",
      lote:21,
      stock:3,
     }
  ]
  return (

   
      <CustomPage titulo='Inventario' contenido={<InventarioList data={data}/>} searchbar/>
    
  );
};

export default Inventario;
