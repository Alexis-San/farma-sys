//Clientes.tsx
import CustomPage from "../components/CustomPage";
import { ClientesType } from "../types/ClientesType";
import ClientesList from "../components/ClientesList";

const Clientes: React.FC = () => {
  const data: ClientesType[] = [];
  return (
    <CustomPage
      titulo="Clientes"
      contenido={<ClientesList />}
      searchbar
    />
  );
};

export default Clientes;
