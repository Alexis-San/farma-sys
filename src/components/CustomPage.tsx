import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { ReactNode } from "react";
import { useStoreState } from "pullstate"; // Importar Pullstate
import { CarritoStore, selectCartItemCount } from "../store"; // Importar la tienda y el selector
import { SearchBar } from "./Search";
import "../theme/ExploreContainer.css";

interface Parametros {
  titulo: string;
  contenido: ReactNode;
  searchbar?: boolean;
}

const CustomPage: React.FC<Parametros> = (parametros) => {
  const cartItemCount = useStoreState(CarritoStore, selectCartItemCount); // Obtener el contador del carrito

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" autoHide={false} className="boton-a" />
          <IonRow>
            <IonCol sizeLg="2" sizeMd="5" className="custom-border">
              <IonTitle className="container-inicio">{parametros.titulo}</IonTitle>
            </IonCol>
            <IonCol sizeLg="10" sizeMd="7" className="custom-border">
              {parametros.searchbar && <SearchBar />}
            </IonCol>
          </IonRow>
          <IonButton slot="end" routerLink="/menu/carrito" className="Boton">
            <IonIcon icon={cartOutline} className="boton" />
            <IonBadge>{cartItemCount}</IonBadge> {/* Mostrar contador dinámico */}
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{parametros.contenido}</IonContent>
    </IonPage>
  );
};

export default CustomPage;

