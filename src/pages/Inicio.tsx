import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CustomPage from '../components/CustomPage';
import ProductosView from '../components/ProductosView'; 
import React from 'react';

const Inicio: React.FC = () => {
  React.useEffect(() => {
    // Verifica si ya se ha recargado
    const hasReloaded = sessionStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      sessionStorage.setItem('hasReloaded', 'true'); // Marca que ya se recargó
      window.location.reload(); // Recarga la página solo una vez
    }
  }, []);

  return (
    <CustomPage 
      titulo='Inicio' 
      contenido={
        <>
          <ExploreContainer />
          <ProductosView />
        </>
      }
      searchbar 
    />
  );
};

export default Inicio;
