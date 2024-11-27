import CustomPage from "../components/CustomPage";
import { CategoriaType } from "../types/CategoriasType";
import CategoriasList from "../components/Catalogo/CategoriaList";


interface CategoriasListProps {
  data: CategoriaType[];
}

const Categorias: React.FC = () => {
  return (
    <CustomPage
      titulo="Categorias"
      contenido={<CategoriasList />}
      searchbar
      cartItemCount={""}
    />
  );
};

export default Categorias;
