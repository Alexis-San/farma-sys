import {
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import CustomPage from "../components/CustomPage";
import InventarioList from "../components/Catalogo/InventarioList";
import { ProductosType } from "../types/ProductosType";
import ProductosList from "../components/Catalogo/ProductosList";

const Productos: React.FC = () => {
  const data: ProductosType[] = [];
  return (
    <CustomPage
      titulo="Productos"
      contenido={<ProductosList />}
      searchbar
      cartItemCount={""}
    />
  );
};

export default Productos;
