import React, { useState } from "react";
import { IonSearchbar } from "@ionic/react";

const BuscarVentas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <IonSearchbar
      placeholder="Buscar ventas..."
      onIonChange={(e) => setSearchTerm(e.detail.value!)}
    />
  );
};

export default BuscarVentas;
