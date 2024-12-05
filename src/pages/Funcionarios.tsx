import React, { useState, useEffect } from "react";
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
  IonSpinner,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { trash, pencil, add } from "ionicons/icons";
import CustomPage from "../components/CustomPage";

const Funcionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState<any | null>(null);
  const [newFuncionario, setNewFuncionario] = useState({ nombre: "", email: "", rol: "" });

  // Función para obtener los datos de la API
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/usuarios/");
      const data = await response.json();
      const usuarios = data.usuarios.map((usuario: any) => ({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol || "Sin asignar",
        activo: usuario.logeado,
      }));
      setFuncionarios(usuarios);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFuncionario = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFuncionario),
      });
      if (response.ok) {
        fetchFuncionarios();
        setShowAddModal(false);
        setNewFuncionario({ nombre: "", email: "", rol: "" });
      }
    } catch (error) {
      console.error("Error al agregar funcionario:", error);
    }
  };

  const handleEditFuncionario = async () => {
    if (!selectedFuncionario) return;

    try {
      const response = await fetch(`http://localhost:8000/api/usuarios/${selectedFuncionario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedFuncionario),
      });
      if (response.ok) {
        fetchFuncionarios();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error al editar funcionario:", error);
    }
  };

  const handleDeleteFuncionario = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/usuarios/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFuncionarios((prev) => prev.filter((funcionario) => funcionario.id !== id));
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error al eliminar funcionario:", error);
    }
  };

  const contenido = (
    <IonContent color="light">
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <IonSpinner name="crescent" />
          <p>Cargando funcionarios...</p>
        </div>
      ) : (
        <IonList inset={true}>
          {funcionarios.map((funcionario) => (
            <IonItemSliding key={funcionario.id}>
              <IonItem button={true}>
                <IonAvatar slot="start">
                  <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                </IonAvatar>
                <IonLabel>
                  <h2>{funcionario.nombre}</h2>
                  <p>{funcionario.email}</p>
                  <p>{funcionario.rol}</p>
                </IonLabel>
                <IonButton
                color={funcionario.logeado ? "success" : "medium"}
                onClick={() => handleToggleLogeado(funcionario.id)}
              >
                {funcionario.logeado ? "Activo" : "Inactivo"}
              </IonButton>
              </IonItem>
              <IonItemOptions slot="end">
                <IonItemOption color="tertiary"  onClick={() => {setSelectedFuncionario(funcionario); // Actualiza el estado seleccionado
                                                                  setShowModal(true); // Abre el modal
                                                                  }}>
                  <IonIcon slot="icon-only" icon={pencil}></IonIcon>
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => handleDeleteFuncionario(funcionario.id)}>
                  <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      )}

      <IonButton expand="block" color="primary" routerLink="/Registro">
        <IonIcon slot="start" icon={add} />
        Agregar Funcionario
      </IonButton>

      {/* Modal para editar */}
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Editar Funcionario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedFuncionario && (
            <div style={{ padding: "20px" }}>
              <IonInput
                placeholder="Nombre"
                value={selectedFuncionario.nombre}
                onIonChange={(e) =>
                  setSelectedFuncionario((prev: any) => ({ ...prev, nombre: e.detail.value }))
                }
              />
              <IonInput
                placeholder="Email"
                value={selectedFuncionario.email}
                onIonChange={(e) =>
                  setSelectedFuncionario((prev: any) => ({ ...prev, email: e.detail.value }))
                }
              />
              <IonInput
                placeholder="Rol"
                value={selectedFuncionario.rol}
                onIonChange={(e) =>
                  setSelectedFuncionario((prev: any) => ({ ...prev, rol: e.detail.value }))
                }
              />
              <IonButton expand="block" onClick={handleEditFuncionario}>
                Guardar Cambios
              </IonButton>
              <IonButton expand="block" color="light" onClick={() => setShowModal(false)}>
                Cancelar
              </IonButton>
            </div>
          )}
        </IonContent>
      </IonModal>

      {/* Modal para agregar */}
      <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Agregar Funcionario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: "20px" }}>
            <IonInput
              placeholder="Nombre"
              value={newFuncionario.nombre}
              onIonChange={(e) =>
                setNewFuncionario((prev) => ({ ...prev, nombre: e.detail.value || "" }))
              }
            />
            <IonInput
              placeholder="Email"
              value={newFuncionario.email}
              onIonChange={(e) =>
                setNewFuncionario((prev) => ({ ...prev, email: e.detail.value || ""}))
              }
            />
            <IonInput
              placeholder="Rol"
              value={newFuncionario.rol}
              onIonChange={(e) =>
                setNewFuncionario((prev) => ({ ...prev, rol: e.detail.value || ""}))
              }
            />
            <IonButton expand="block" onClick={handleAddFuncionario}>
              Guardar
            </IonButton>
            <IonButton expand="block" color="light" onClick={() => setShowAddModal(false)}>
              Cancelar
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </IonContent>
  );

  return <CustomPage titulo="Funcionarios" contenido={contenido} searchbar />;
};

export default Funcionarios;




