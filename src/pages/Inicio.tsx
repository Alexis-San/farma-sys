import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import CustomPage from '../components/CustomPage';
import ProductosView from '../components/ProductosView'; // Asegúrate de importar ProductosView


const Inicio: React.FC = () => {
  //const cartItemCount = useStoreState(selectCartItemCount);

  return (
    <CustomPage 
      titulo='Inicio' 
      contenido={
        <>
          <ExploreContainer />
          <ProductosView /> {/* Renderiza ProductosView sin pasar props */}
        </>
      }
      searchbar 
    />
  );
};

export default Inicio;
