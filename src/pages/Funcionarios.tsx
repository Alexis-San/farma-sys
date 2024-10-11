import CustomPage from "../components/CustomPage";
import ExploreContainer from "../components/ExploreContainer";




const Funcionarios: React.FC = () => {
    return (
      <CustomPage titulo='Funcionarios' contenido={<ExploreContainer/>}/>
    );
  };
  
  export default Funcionarios;