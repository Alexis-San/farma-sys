import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonItemGroup, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { homeOutline, logOutOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './tab4';

const Menu: React.FC = () => {
    const paths =[
        { name: 'Tab1', URL:'/menu/Tab1', icon: homeOutline},
        {name: 'Tab2', URL:'/menu/Tab2', icon: homeOutline},
        {name: 'Tab3', URL:'/menu/Tab3', icon: homeOutline},
        {name: 'Tab4', URL:'/menu/tab4', icon: homeOutline},
    ]
  return (
  <IonPage>
      <IonSplitPane contentId='main'>
        <IonMenu contentId='main'type='overlay'>
            <IonHeader>
            <IonToolbar>
                <IonTitle >
                    Menu
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
            <Route exact path="/menu/Tab1" component={Tab1}/>
            <Route exact path="/menu/Tab2" component={Tab2}/>
            <Route exact path="/menu/Tab3" component={Tab3}/>
            <Route exact path="/menu/tab4" component={Tab4}/>
            <Route exact path="/menu"> 
                <Redirect to="/menu/Tab1" />
            </Route>
        </IonRouterOutlet>
      </IonSplitPane>
      </IonPage>
  );
};

export default Menu;
