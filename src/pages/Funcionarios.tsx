import React, { useState } from "react";
import {
  IonContent,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonAvatar,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonModal,
  IonButton,
} from "@ionic/react";
import { trash, pencil } from "ionicons/icons";
import CustomPage from "../components/CustomPage";

const Funcionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nombre: "Juan Pérez", cargo: "Gerente", departamento: "Ventas", activo: true },
    { id: 2, nombre: "María Gómez", cargo: "Analista", departamento: "TI", activo: true },
    { id: 3, nombre: "Carlos López", cargo: "Asistente", departamento: "RRHH", activo: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState<any | null>(null);

  const handleToggleEstado = (id: number) => {
    setFuncionarios((prevFuncionarios) =>
      prevFuncionarios.map((funcionario) =>
        funcionario.id === id ? { ...funcionario, activo: !funcionario.activo } : funcionario
      )
    );
    console.log("Estado cambiado para el ID:", id);
  };

  const handleEdit = (funcionario: any) => {
    setSelectedFuncionario(funcionario);
    setShowModal(true);
    console.log("Editando funcionario:", funcionario);
  };

  const handleDelete = (id: number) => {
    setFuncionarios((prevFuncionarios) => prevFuncionarios.filter((funcionario) => funcionario.id !== id));
    setShowModal(false);
    console.log("Eliminado funcionario con ID:", id);
  };

  const contenido = (
    <IonContent color="light">
      <IonList inset={true}>
        {funcionarios.map((funcionario) => (
          <IonItemSliding key={funcionario.id}>
            <IonItem button={true}>
              <IonAvatar slot="start">
                <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </IonAvatar>
              <IonLabel>
                <h2>{funcionario.nombre}</h2>
                <p>
                  {funcionario.cargo} - {funcionario.departamento}
                </p>
              </IonLabel>
              <IonButton
                color={funcionario.activo ? "success" : "medium"}
                onClick={() => handleToggleEstado(funcionario.id)}
              >
                {funcionario.activo ? "Activo" : "Inactivo"}
              </IonButton>
            </IonItem>
            <IonItemOptions slot="end">
              {/* Botón Editar */}
              <IonItemOption color="tertiary" onClick={() => handleEdit(funcionario)}>
                <IonIcon slot="icon-only" icon={pencil}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonList>

      {/* Modal para editar/eliminar */}
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        {selectedFuncionario && (
          <div style={{ padding: "20px" }}>
            <h2>Editar Funcionario</h2>
            <p>
              <strong>Nombre:</strong> {selectedFuncionario.nombre}
            </p>
            <p>
              <strong>Cargo:</strong> {selectedFuncionario.cargo}
            </p>
            <p>
              <strong>Departamento:</strong> {selectedFuncionario.departamento}
            </p>
            <IonButton
              color="danger"
              expand="block"
              onClick={() => handleDelete(selectedFuncionario.id)}
            >
              <IonIcon slot="start" icon={trash}></IonIcon>
              Eliminar Funcionario
            </IonButton>
            <IonButton expand="block" onClick={() => setShowModal(false)}>
              Cerrar
            </IonButton>
          </div>
        )}
      </IonModal>
    </IonContent>
  );

  return <CustomPage titulo="Funcionarios" contenido={contenido} searchbar cartItemCount="2" />;
};

export default Funcionarios;

