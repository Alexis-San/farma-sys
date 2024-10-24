import CustomPage from "../components/CustomPage";
import ExploreContainer from "../components/ExploreContainer";
import { IonButton } from "@ionic/react";



const Funcionarios: React.FC = () => {
    return (
      <CustomPage titulo='Funcionarios' contenido={<ExploreContainer />} searchbar cartItemCount="2"/>
    );
  };
  
  export default Funcionarios;