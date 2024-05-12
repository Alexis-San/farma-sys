import { IonApp, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonItemGroup, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { appsOutline, bagAddOutline, bagCheckOutline, cartOutline, cogOutline, homeOutline, logOutOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';

import Inicio from './Inicio';
import Inventario from './Inventario';
import Tab3 from './Venta';
import Conf from './Conf';
import Venta from './Venta';
import { IonSearchbar} from '@ionic/react';
import { Icon } from 'ionicons/dist/types/components/icon/icon';

const Menu: React.FC = () => {
    const paths =[
        { name: 'Inicio', URL:'/menu/Inicio', icon: appsOutline},
        {name: 'Inventario', URL:'/menu/Inventario', icon: bagAddOutline},
        {name: 'Ventas', URL:'/menu/Venta', icon: cartOutline},
        {name: 'Configuración', URL:'/menu/Conf', icon: cogOutline},
    ]
    
  return (



  <IonPage>
 

      <IonSplitPane contentId='main'>
        <IonMenu contentId='main'type='overlay'>
            <IonHeader>
            <IonToolbar>
                <IonTitle  >
                      PARMA-SYS
                </IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                {paths.map((item,index)=>(
                    <IonMenuToggle key={index} autoHide={false}>

                        <IonItem routerLink={item.URL} routerDirection="none">
                            <IonIcon icon={item.icon} slot='start'></IonIcon>
                        {item.name}
                        </IonItem>
                    </IonMenuToggle>
                ))}
                <IonButton routerLink="/" routerDirection="back" expand="full">
                    <IonIcon icon={logOutOutline} slot='start'></IonIcon>
                    Logout
                </IonButton>
            </IonContent>
        </IonMenu>
        <IonRouterOutlet id='main'>
            <Route exact path="/menu/Inicio" component={Inicio}/>
            <Route exact path="/menu/Inventario" component={Inventario}/>
            <Route exact path="/menu/Venta" component={Venta}/>
            <Route exact path="/menu/Conf" component={Conf}/>
            <Route exact path="/menu"> 
                <Redirect to="/menu/Inicio" />
            </Route>
        </IonRouterOutlet>
      </IonSplitPane>
      </IonPage>
  );
};

export default Menu;
