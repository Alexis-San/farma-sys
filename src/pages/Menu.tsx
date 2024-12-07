import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  IonAccordion,
  IonAccordionGroup,
  IonLabel,
  useIonRouter,
} from "@ionic/react";
import {
  homeOutline,
  medkitOutline,
  layersOutline,
  storefrontOutline,
  pricetagsOutline,
  flaskOutline,
  archiveOutline,
  cashOutline,
  barChartOutline,
  settingsOutline,
  logOutOutline,
  peopleCircleOutline,
  businessOutline,
  personCircleOutline,
} from "ionicons/icons"; // Actualizamos los iconos
import { Redirect, Route } from "react-router";
import Inicio from "./Inicio";
import Funcionarios from "./Funcionarios";
import Configuracion from "./Conf";
import Inventario from "./Inventario";
import Productos from "./Productos";
import Venta from "./Ventas";
import menu from "./Menu.css";
import Drogas from "./Drogas";
import Categorias from "./Categorias";
import Laboratorios from "./Laboratorios";
import Proveedores from "./Proveedores";
import Carrito from "./Carrito";
import Clientes from "./Clientes";
import { useHistory } from "react-router";

const Menu: React.FC = () => {
  const navigation = useIonRouter();
  const history = useHistory(); // Obtén el objeto history

  const doLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/login/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al desloguear.");
      }

      navigation.push("/", "forward", "replace");
    } catch (error) {
      console.error("Error en el logout:", error);
    }
  };

  const catalogo = [
    { name: "Drogas", URL: "/menu/Drogas", icon: medkitOutline },
    { name: "Categorías", URL: "/menu/Categorias", icon: pricetagsOutline },
    { name: "Inventario", URL: "/menu/Inventario", icon: archiveOutline },
    { name: "Laboratorios", URL: "/menu/Laboratorios", icon: flaskOutline },
    { name: "Productos", URL: "/menu/Productos", icon: layersOutline },
  ];

  const transacciones = [
    { name: "Venta", URL: "/menu/Venta", icon: storefrontOutline },
  ];

  const handleClick = () => {
    history.push("/menu/Inicio"); // Navega a la ruta
    window.location.reload(); // Recarga la página
  };

  return (
    <IonPage>
      <IonSplitPane contentId="main" when="false">
        <IonMenu contentId="main" type="reveal">
          <IonHeader>
            <IonToolbar>
              <IonTitle className="container-inicio">FARMA PUEBLO</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {/* Inicio */}
            <IonMenuToggle>
              <IonItem button={true} onClick={handleClick}>
                <IonIcon icon={homeOutline} slot="start" />
                Inicio
              </IonItem>
            </IonMenuToggle>

            <IonAccordionGroup>
              <IonAccordion value="transacciones">
                <IonItem slot="header">
                  <IonIcon icon={cashOutline} slot="start" />
                  <IonLabel>Transacciones</IonLabel>
                </IonItem>
                <div slot="content">
                  {transacciones.map((item, index) => (
                    <IonMenuToggle key={index}>
                      <IonItem
                        style={{ paddingLeft: "20px" }}
                        routerLink={item.URL}
                        routerDirection="none"
                      >
                        <IonIcon icon={item.icon} slot="start" />
                        {item.name}
                      </IonItem>
                    </IonMenuToggle>
                  ))}
                </div>
              </IonAccordion>

              <IonAccordion value="catalogo">
                <IonItem slot="header">
                  <IonIcon icon={layersOutline} slot="start" />
                  <IonLabel>Catálogo</IonLabel>
                </IonItem>
                <div slot="content">
                  {catalogo.map((item, index) => (
                    <IonMenuToggle key={index}>
                      <IonItem
                        style={{ paddingLeft: "20px" }}
                        routerLink={item.URL}
                        routerDirection="none"
                      >
                        <IonIcon icon={item.icon} slot="start" />
                        {item.name}
                      </IonItem>
                    </IonMenuToggle>
                  ))}
                </div>
              </IonAccordion>
            </IonAccordionGroup>

            {/* Clientes */}
            <IonMenuToggle>
              <IonItem routerLink="/menu/Clientes" routerDirection="none">
                <IonIcon icon={peopleCircleOutline} slot="start" />
                Clientes
              </IonItem>
            </IonMenuToggle>

            {/* Proveedores */}
            <IonMenuToggle>
              <IonItem routerLink="/menu/Proveedores" routerDirection="none">
                <IonIcon icon={businessOutline} slot="start" />
                Proveedores
              </IonItem>
            </IonMenuToggle>

            {/* Funcionarios */}
            <IonMenuToggle>
              <IonItem routerLink="/menu/Funcionarios" routerDirection="none">
                <IonIcon icon={personCircleOutline} slot="start" />
                Funcionarios
              </IonItem>
            </IonMenuToggle>

            {/* Configuración 
            <IonMenuToggle>
              <IonItem routerLink="/menu/Configuracion" routerDirection="none">
                <IonIcon icon={settingsOutline} slot="start" />
                Configuración
              </IonItem>
            </IonMenuToggle>
            */}
            {/* Logout */}
            <IonButton onClick={doLogout} expand="full" className="ion-button">
              <IonIcon icon={logOutOutline} slot="start" />
              Logout
            </IonButton>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route exact path="/menu/Inicio" component={Inicio} />
          <Route exact path="/menu/Funcionarios" component={Funcionarios} />
          <Route exact path="/menu/Carrito" component={Carrito} />
          <Route exact path="/menu/Configuracion" component={Configuracion} />
          <Route exact path="/menu/Clientes" component={Clientes} />
          <Route exact path="/menu/Proveedores" component={Proveedores} />
          <Route exact path="/menu/Drogas" component={Drogas} />
          <Route exact path="/menu/Categorias" component={Categorias} />
          <Route exact path="/menu/Inventario" component={Inventario} />
          <Route exact path="/menu/Laboratorios" component={Laboratorios} />
          <Route exact path="/menu/Productos" component={Productos} />
          <Route exact path="/menu/Venta" component={Venta} />
          <Route exact path="/menu">
            <Redirect to="/menu/Inicio" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
