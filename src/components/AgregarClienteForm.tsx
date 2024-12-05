import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonContent,
  IonText,
} from "@ionic/react";
import { ClientesType } from "../types/ClientesType";

interface AgregarClienteFormProps {
  onGuardarCliente: (cliente: ClientesType) => void; // Función para manejar el guardado
}

const AgregarClienteForm: React.FC<AgregarClienteFormProps> = ({
  onGuardarCliente,
}) => {
  const [nuevoCliente, setNuevoCliente] = useState<ClientesType>({
    id: 0, // Generado dinámicamente en el backend
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    tipo_cliente: "",
    ci: "",
  });

  const [error, setError] = useState<string>("");

  const manejarCambio = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setNuevoCliente({
      ...nuevoCliente,
      [name]: value,
    });
  };

  const guardarCliente = () => {
    if (
      !nuevoCliente.nombre ||
      !nuevoCliente.apellido ||
      !nuevoCliente.email ||
      !nuevoCliente.telefono ||
      !nuevoCliente.tipo_cliente ||
      !nuevoCliente.ci
    ) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setError(""); // Limpia el error
    onGuardarCliente(nuevoCliente);
    setNuevoCliente({
      id: 0,
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      tipo_cliente: "",
      ci: "",
    }); // Limpia el formulario
  };

  return (
    <IonContent>
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
      <IonItem>
        <IonLabel position="stacked">CI</IonLabel>
        <IonInput
          name="ci"
          value={nuevoCliente.ci}
          onIonChange={manejarCambio}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Nombre</IonLabel>
        <IonInput
          name="nombre"
          value={nuevoCliente.nombre}
          onIonChange={manejarCambio}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Apellido</IonLabel>
        <IonInput
          name="apellido"
          value={nuevoCliente.apellido}
          onIonChange={manejarCambio}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Email</IonLabel>
        <IonInput
          name="email"
          type="email"
          value={nuevoCliente.email}
          onIonChange={manejarCambio}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Teléfono</IonLabel>
        <IonInput
          name="telefono"
          type="tel"
          value={nuevoCliente.telefono}
          onIonChange={manejarCambio}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Tipo</IonLabel>
        <IonInput
          name="tipo_cliente"
          value={nuevoCliente.tipo_cliente}
          onIonChange={manejarCambio}
        />
      </IonItem>
      <IonButton expand="full" onClick={guardarCliente}>
        Guardar Cliente
      </IonButton>
    </IonContent>
  );
};

export default AgregarClienteForm;
