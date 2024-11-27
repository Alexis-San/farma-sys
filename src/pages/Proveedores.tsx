import CustomPage from "../components/CustomPage";
import ProveedoresList from "../components/ProveedoresList";
import { ProveedoresType } from "../types/ProveedoresType";

interface ProveedoresListProps {
  data: ProveedoresType[];
}

const Proveedores: React.FC = () => {
  return (
    <CustomPage
      titulo="Proveedores"
      contenido={<ProveedoresList />}
      searchbar
      cartItemCount={""}
    />
  );
};

export default Proveedores;