import CustomPage from "../components/CustomPage";
import { ProductosType } from "../types/ProductosType";
import ProductosList from "../components/Catalogo/ProductosList";

const Productos: React.FC = () => {
  const data: ProductosType[] = [];
  return (
    <CustomPage
      titulo="Productos"
      contenido={<ProductosList />}
      searchbar
      cartItemCount={""}
    />
  );
};

export default Productos;
