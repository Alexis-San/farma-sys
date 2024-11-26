import CustomPage from "../components/CustomPage";
import { DrogasType } from "../types/DrogasType";
import DrogasList from "../components/Catalogo/DrogasList";

interface DrogasListProps {
  data: DrogasType[];
}
const Drogas: React.FC = () => {
  return (
    <CustomPage
      titulo="Productos"
      contenido={<DrogasList />}
      searchbar
      cartItemCount={""}
    />
  );
};

export default Drogas;
