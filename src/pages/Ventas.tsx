import React from "react";
import CustomPage from "../components/CustomPage";
import HistorialVentas from "../components/Ventas/HistorialVentas";
import GraficaVentas from "../components/Ventas/GraficaVentas";
import PanelControl from "../components/Ventas/PanelControl";
import ExportarVentas from "../components/Ventas/ExportarVentas";
import ClientesFrecuentes from "../components/Ventas/ClientesFrecuentes";
import BuscarVentas from "../components/Ventas/BuscarVentas";

const Ventas: React.FC = () => {
  return (
    <CustomPage
      titulo="Ventas"
      contenido={
        <>
          <BuscarVentas />
          <PanelControl />
          <GraficaVentas />
          <HistorialVentas />
          <ClientesFrecuentes />
          <ExportarVentas />
        </>
      }
      searchbar
    />
  );
};

export default Ventas;
