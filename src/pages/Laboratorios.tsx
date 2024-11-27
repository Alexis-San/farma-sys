import CustomPage from "../components/CustomPage";
import LaboratoriosList from "../components/Catalogo/LaboratoriosList";
import { LaboratoriosType } from "../types/LaboratoriosType";


interface LaboratoriosListProps {
  data: LaboratoriosType[];
}
const Laboratorios: React.FC = () => {
  return (
    <CustomPage
      titulo="Laboratorios"
      contenido={<LaboratoriosList />} 
      searchbar
      cartItemCount={""}
    />
  );
};

export default Laboratorios;
