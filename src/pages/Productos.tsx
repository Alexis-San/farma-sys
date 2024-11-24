import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CustomPage from '../components/CustomPage';
import InventarioList from '../components/InventarioList';
import { InventarioType } from '../types/InventarioType';


const Productos: React.FC = () => {
  const data:InventarioType[]=[
    {id_producto_inventario: 1,
     descripcion:"RICA C : RICA C 1000 MG. POLVO",
     precio_compra:20000,
     precio_venta:38000,
     fecha_vencimiento: "12/09/24",
     lote:2,
     stock:3,
    },
    {id_producto_inventario: 2,
      descripcion:"ANGRIPAS : ANGRIPAS PLUS NF CAPS.",
      precio_compra:2500,
      precio_venta:8250,
      fecha_vencimiento: "09/09/24",
      lote:1,
      stock:5,
     },
     {id_producto_inventario: 4,
      descripcion:"DOLANET : DOLANET PLUS COMP.",
      precio_compra:12500,
      precio_venta:20240,
      fecha_vencimiento: "01/05/22",
      lote:1,
      stock:3,
     },{id_producto_inventario: 5,
      descripcion:"CITRO : CITRO PLUS JARABE",
      precio_compra:11500,
      precio_venta:18200,
      fecha_vencimiento: "01/10/24",
      lote:2,
      stock:10,
     },
     {id_producto_inventario: 6,
      descripcion:"SALBUTOL : SALBUTOL",
      precio_compra:20000,
      precio_venta:24500,
      fecha_vencimiento: "11/09/25",
      lote:2,
      stock:8,
     },
     {id_producto_inventario: 7,
      descripcion:"BRONTEL : BRONTEL MUCOLITICO PLUS JARABE",
      precio_compra:20000,
      precio_venta:25450	,
      fecha_vencimiento: "01/08/26",
      lote:2,
      stock:2,
     },
     {id_producto_inventario: 8,
      descripcion:"ADHENT : ADHENT BIOTIC PLUS COMP. REC.",
      precio_compra:25040,
      precio_venta:27.300,
      fecha_vencimiento: "05/06/28",
      lote:1,
      stock:5,
     },
     {id_producto_inventario: 9,
      descripcion:"GRIPSYL : GRIPSYL PLUS FORTE JARABE",
      precio_compra:25000,
      precio_venta:28000,
      fecha_vencimiento: "08/05/26",
      lote:2,
      stock:12,
     },
     {id_producto_inventario: 10,
      descripcion:"DOLO : DOLO GALEN REUMA FORTE COMP. REC. GASTRO.",
      precio_compra:28000,
      precio_venta:31900,
      fecha_vencimiento: "01/04/29",
      lote:1,
      stock:2,
     },
     {id_producto_inventario: 11,
      descripcion:"PRODENT : PRODENT FORTE 20 COMP. REC.",
      precio_compra:25000,
      precio_venta:29000,
      fecha_vencimiento: "25/09/25",
      lote:1,
      stock:2,
     },
     
  ]
  return (

   
      <CustomPage titulo='Productos' contenido={<InventarioList data={data}/>} searchbar/>
    
  );
};

export default Productos;