import { IonButton, IonCol, IonContent, IonHeader, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from './ExploreContainer';
import { Children, ReactNode } from 'react';
import { IonButtons, IonIcon, IonBadge } from '@ionic/react';
import { heartOutline, cartOutline, logInOutline } from 'ionicons/icons';
import { SearchBar } from './Search';
import "../theme/ExploreContainer.css"

interface Parametros {
  titulo: string,
  contenido: ReactNode,
  searchbar?: boolean;
  cartItemCount: string;

}
const CustomPage: React.FC<Parametros> = (parametros) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar  > {/* Envuelve el IonMenuButton en IonButtons */}
              <IonMenuButton slot='start' autoHide={false} className='boton-a'/>
          <IonRow>
            <IonCol sizeLg='2' sizeMd='5' className='container-inicio'>
              <IonTitle className='container-inicio'> {parametros.titulo} </IonTitle>
            </IonCol>
            <IonCol sizeLg='10' sizeMd='7'>
              {(parametros.searchbar) && (<SearchBar></SearchBar>)
              }
            </IonCol>
          </IonRow>
          <IonButton slot='end' routerLink='/menu/carrito' className='Boton'>
            <IonIcon icon={cartOutline} className='boton' />
            <IonBadge>{parametros.cartItemCount}</IonBadge>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen  >
        {parametros.contenido}
      </IonContent>
    </IonPage>
  );
};

export default CustomPage;
