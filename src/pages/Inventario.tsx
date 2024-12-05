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

const Inventario: React.FC = () => {
  return (
    <CustomPage
      titulo="Inventario"
      contenido={<InventarioList />}
      searchbar
    />
  );
};

export default Inventario;
