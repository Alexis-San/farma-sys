//Clientes.tsx
import CustomPage from "../components/CustomPage";
import { ClientesType } from "../types/ClientesType";
import ClientesList from "../components/ClientesList";

const Clientes: React.FC = () => {
  return (
    <CustomPage
      titulo="Clientes"
      contenido={<ClientesList />}
      searchbar
      cartItemCount={""}
    />
  );
};

export default Clientes;
