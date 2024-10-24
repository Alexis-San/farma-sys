import {  IonButton, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { appsOutline, bagAddOutline, cartOutline, cogOutline, logOutOutline, personOutline, barChartOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import "../theme/ExploreContainer.css"
import Inicio from './Inicio';
import Inventario from './Inventario';
import Conf from './Conf';
import Venta from './Venta';
import Funcionarios from './Funcionarios';
import Carrito from './Carrito';

const Menu: React.FC = () => {
    const paths =[
        { name: 'Inicio', URL:'/menu/Inicio', icon: appsOutline},        
        {name: 'Funcionarios', URL:'/menu/Funcionarios', icon: personOutline},
        {name: 'Inventario', URL:'/menu/Inventario', icon: bagAddOutline},
        {name: 'Ventas', URL:'/menu/Venta', icon: barChartOutline}, 
        {name: 'Configuración', URL:'/menu/Conf', icon: cogOutline},
      
    ]
    
  return (



  <IonPage>
 

      <IonSplitPane contentId='main' when="false">
        <IonMenu contentId='main' type='reveal'  >
            <IonHeader>
            <IonToolbar>
                <IonTitle className='container-inicio' >
                      FARMASYS
                </IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                {paths.map((item,index)=>(
                    <IonMenuToggle key={index}>

                        <IonItem routerLink={item.URL} routerDirection="none">
                            <IonIcon icon={item.icon} slot='start'></IonIcon>
                        {item.name}
                        </IonItem>
                    </IonMenuToggle>
                ))}
                <IonButton routerLink="/" routerDirection="back" expand="full" className='ion-button'>
                    <IonIcon icon={logOutOutline} slot='start'></IonIcon>
                    Logout
                </IonButton>
            </IonContent>
        </IonMenu >
        <IonRouterOutlet id='main'>
            <Route exact path="/menu/Inicio" component={Inicio}/>
            <Route exact path="/menu/Inventario" component={Inventario}/>
            <Route exact path="/menu/Venta" component={Venta}/>
            <Route exact path="/menu/Funcionarios" component={Funcionarios}/>
            <Route exact path="/menu/Conf" component={Conf}/>
            <Route exact path="/menu/Carrito" component={Carrito}/>
            <Route exact path="/menu"> 
                <Redirect to="/menu/Inicio" />
            </Route>
        </IonRouterOutlet>
      </IonSplitPane>
      </IonPage>
  );
};

export default Menu;
