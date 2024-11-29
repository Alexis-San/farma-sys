//ESTE ES NUEVOO JEJEJE
import React, { useState } from "react";
import { IonItem, IonLabel, IonInput, IonButton, IonContent } from "@ionic/react";
import { ClientesType } from "../types/ClientesType";

interface AgregarClienteFormProps {
  onGuardarCliente: (cliente: ClientesType) => void; // Función para manejar el guardado
}

const AgregarClienteForm: React.FC<AgregarClienteFormProps> = ({ onGuardarCliente }) => {
  const [nuevoCliente, setNuevoCliente] = useState<ClientesType>({
    id: 0,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    tipo_cliente: "",
  });

  const manejarCambio = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setNuevoCliente({
      ...nuevoCliente,
      [name]: value,
    });
  };

  const guardarCliente = () => {
    onGuardarCliente(nuevoCliente);
    setNuevoCliente({
      id: 0,
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      tipo_cliente: "",
    }); // Limpia el formulario
  };

  return (
    <IonContent>
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
          value={nuevoCliente.email}
          onIonChange={manejarCambio}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Teléfono</IonLabel>
        <IonInput
          name="telefono"
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
