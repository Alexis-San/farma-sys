import { IonButton, IonCol, IonContent, IonHeader, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Children, ReactNode } from 'react';
import { SearchBar } from './Search';

interface Parametros {
    titulo: string,
   contenido:ReactNode,
   searchbar ?: ReactNode

}
const CustomPage: React.FC <Parametros> = (parametros) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButton>
          <IonRow>
            <IonCol sizeLg='2' sizeMd='5' >
            <IonTitle > {parametros.titulo} </IonTitle>
            </IonCol>
            <IonCol sizeLg='10' sizeMd='7'>
            <SearchBar></SearchBar>
            </IonCol>
          </IonRow>
       
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        {parametros.contenido}
      </IonContent>
    </IonPage>
  );
};

export default CustomPage;
