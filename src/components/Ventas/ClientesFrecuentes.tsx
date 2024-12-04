import React, { useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol, IonSpinner, IonAlert, IonTitle, IonCard, IonCardContent} from "@ionic/react";
import "../../theme/ventas.css";

const ClientesFrecuentes: React.FC = () => {
  const [clientesFrecuentes, setClientesFrecuentes] = useState<
    { id: number; nombreCompleto: string; tipoCliente: string; compras: number; totalGastado: number }[] 
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClientesFrecuentes = async () => {
      setLoading(true);
      try {
        // Obtener la lista de clientes
        const clientesResponse = await fetch("http://localhost:8000/api/clientes/");
        const clientesData = await clientesResponse.json();

        if (!clientesData.clientes) {
          throw new Error("No se pudieron cargar los clientes.");
        }

        // Obtener las ventas por cliente y calcular estadísticas
        const clientesConEstadisticas = await Promise.all(
          clientesData.clientes.map(async (cliente: any) => {
            try {
              const ventasResponse = await fetch(
                `http://localhost:8000/api/informes/ventas/buscar/${cliente.id}`
              );
              const ventasData = await ventasResponse.json();

              if (!ventasData.ok) {
                throw new Error(`Error cargando ventas para cliente ${cliente.id}`);
              }

              const totalGastado = ventasData.ventas.reduce(
                (acc: number, venta: any) => acc + parseFloat(venta.monto_final),
                0
              );

              return {
                id: cliente.id,
                nombreCompleto: `${cliente.nombre} ${cliente.apellido}`,
                tipoCliente: cliente.tipo_cliente,
                compras: ventasData.ventas.length,
                totalGastado,
              };
            } catch {
              return {
                id: cliente.id,
                nombreCompleto: `${cliente.nombre} ${cliente.apellido}`,
                tipoCliente: cliente.tipo_cliente,
                compras: 0,
                totalGastado: 0,
              };
            }
          })
        );

        setClientesFrecuentes(clientesConEstadisticas);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientesFrecuentes();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (error) {
    return (
      <IonAlert
        isOpen={!!error}
        onDidDismiss={() => setError("")}
        header="Error"
        message={error}
        buttons={["OK"]}
      />
    );
  }

  return (
    <div className="table-clientes">
      <IonTitle className="table-title">CLIENTES FRECUENTES</IonTitle>
      <IonGrid>
        {/* Header de la tabla */}
        <IonCard>
          <IonCardContent >
          <div className="clientes-scroll">
            <IonRow className="header-row">
              <IonCol size="4"><strong>Cliente</strong></IonCol>
              <IonCol size="3"><strong>Tipo</strong></IonCol>
              <IonCol size="2"><strong>Compras</strong></IonCol>
              <IonCol size="3"><strong>Total Gastado</strong></IonCol>
            </IonRow>
            
            {/* Contenedor con scroll */}
            
              {/* Contenido de la tabla */}
              {clientesFrecuentes.map((cliente, index) => (
                <IonRow key={cliente.id} className={`data-row ${index % 2 === 0 ? "even" : "odd"}`}>
                  <IonCol size="4" className="letrita">{cliente.nombreCompleto}</IonCol>
                  <IonCol size="3" className="letrita">{cliente.tipoCliente}</IonCol>
                  <IonCol size="2" className="letrita">{cliente.compras}</IonCol>
                  <IonCol size="3" className="letrita">{`₡${cliente.totalGastado.toLocaleString()}`}</IonCol>
                </IonRow>
              ))}
            </div>
          </IonCardContent>
        </IonCard>
      </IonGrid>
    </div>
  );
};

export default ClientesFrecuentes;


