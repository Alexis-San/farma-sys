import React from 'react';
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
} from '@ionic/react';
import { appsOutline, bagAddOutline, cartOutline, fileTrayFullOutline, cogOutline, logOutOutline, personOutline, barChartOutline, peopleOutline, businessOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import Inicio from './Inicio';
import Funcionarios from './Funcionarios';
import Configuracion from './Conf';
import Inventario from './Inventario';

import Productos from './Productos';
import Venta from './Ventas';


const Menu: React.FC = () => {
    const catalogo = [
        { name: 'Drogas', URL: '/menu/Drogas', icon: fileTrayFullOutline },
        { name: 'Categorías', URL: '/menu/Categorias', icon: fileTrayFullOutline },
        { name: 'Inventario', URL: '/menu/Inventario', icon: bagAddOutline },
        { name: 'Laboratorios', URL: '/menu/Laboratorios', icon: fileTrayFullOutline },
        { name: 'Productos', URL: '/menu/Productos', icon: fileTrayFullOutline },
    ];

    const transacciones = [
        { name: 'Compra', URL: '/menu/Compra', icon: cartOutline },
        { name: 'Venta', URL: '/menu/Venta', icon: barChartOutline },
    ];

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
                            <IonItem routerLink="/menu/Inicio" routerDirection="none">
                                <IonIcon icon={appsOutline} slot="start" />
                                Inicio
                            </IonItem>
                        </IonMenuToggle>

                        {/* Transacciones */}
                        <IonAccordionGroup>
                            <IonAccordion value="transacciones">
                                <IonItem slot="header">
                                    <IonIcon icon={cartOutline} slot="start" />
                                    <IonLabel>Transacciones</IonLabel>
                                </IonItem>
                                <div slot="content">
                                    {transacciones.map((item, index) => (
                                        <IonMenuToggle key={index}>
                                            <IonItem routerLink={item.URL} routerDirection="none">
                                                <IonIcon icon={item.icon} slot="start" />
                                                {item.name}
                                            </IonItem>
                                        </IonMenuToggle>
                                    ))}
                                </div>
                            </IonAccordion>

                            {/* Catálogo */}
                            <IonAccordion value="catalogo">
                                <IonItem slot="header">
                                    <IonIcon icon={fileTrayFullOutline} slot="start" />
                                    <IonLabel>Catálogo</IonLabel>
                                </IonItem>
                                <div slot="content">
                                    {catalogo.map((item, index) => (
                                        <IonMenuToggle key={index}>
                                            <IonItem routerLink={item.URL} routerDirection="none">
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
                                <IonIcon icon={peopleOutline} slot="start" />
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
                                <IonIcon icon={personOutline} slot="start" />
                                Funcionarios
                            </IonItem>
                        </IonMenuToggle>

                        {/* Configuración */}
                        <IonMenuToggle>
                            <IonItem routerLink="/menu/Configuracion" routerDirection="none">
                                <IonIcon icon={cogOutline} slot="start" />
                                Configuración
                            </IonItem>
                        </IonMenuToggle>

                        {/* Logout */}
                        <IonButton routerLink="/" routerDirection="back" expand="full" className="ion-button">
                            <IonIcon icon={logOutOutline} slot="start" />
                            Logout
                        </IonButton>
                    </IonContent>
                </IonMenu>

                <IonRouterOutlet id="main">
                    <Route exact path="/menu/Inicio" component={Inicio} />
                    <Route exact path="/menu/Funcionarios" component={Funcionarios} />
                    <Route exact path="/menu/Configuracion" component={Configuracion} />
                    <Route exact path="/menu/Clientes" component={Inicio} />
                    <Route exact path="/menu/Proveedores" component={Inicio} />
                    <Route exact path="/menu/Drogas" component={Inicio} />
                    <Route exact path="/menu/Categorias" component={Inicio} />
                    <Route exact path="/menu/Inventario" component={Inventario} />
                    <Route exact path="/menu/Laboratorios" component={Inicio} />
                    <Route exact path="/menu/Productos" component={Productos} />
                    <Route exact path="/menu/Compra" component={Inicio} />
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
