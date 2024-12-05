import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonLoading, IonRow, IonText, IonModal } from "@ionic/react";
import { eyeOffOutline, eyeOutline, personOutline, mailOutline, lockClosedOutline } from "ionicons/icons";
import React, { ReactNode, useState } from "react";
import { useIonRouter } from "@ionic/react"; // Importamos el hook para la navegación
import "../theme/conf.css";

interface RegistroProps {
  registroAction?: () => Promise<void>;
  noEditable?: boolean;
  contenido: ReactNode;
}

const RegistroView: React.FC<RegistroProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    usuario: "",
    gmail: "",
    contraseña: "",
    confirmarContraseña: "",
    general: ""
  });

  const [formValues, setFormValues] = useState({
    usuario: "",
    gmail: "",
    contraseña: "",
    confirmarContraseña: ""
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para manejar el modal

  const router = useIonRouter(); // Usamos el hook para navegar

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const limpiarInputs = () => {
    setFormValues({
      usuario: "",
      gmail: "",
      contraseña: "",
      confirmarContraseña: ""
    });

    document.querySelectorAll('ion-input').forEach((input: any) => input.value = '');
  };

  // Validación del formulario
  const validateForm = () => {
    let errors = { ...formErrors };
    let isValid = true;

    if (!formValues.usuario.trim()) {
      errors.usuario = "El nombre de usuario es obligatorio.";
      isValid = false;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formValues.gmail)) {
      errors.gmail = "Por favor ingresa un correo válido.";
      isValid = false;
    }

    if (formValues.contraseña.length < 6) {
      errors.contraseña = "La contraseña debe tener al menos 6 caracteres.";
      isValid = false;
    }

    if (formValues.contraseña !== formValues.confirmarContraseña) {
      errors.confirmarContraseña = "Las contraseñas no coinciden.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: CustomEvent, field: string) => {
    const value = e.detail.value;
    setFormValues({ ...formValues, [field]: value });
    setFormErrors({ ...formErrors, [field]: "" }); // Limpiar error al cambiar el valor
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8000/api/usuarios/', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: formValues.usuario,
            email: formValues.gmail,
            password: formValues.contraseña,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al registrar el usuario');
        }

        const data = await response.json();
        console.log('Usuario registrado:', data);

        if (props.registroAction) {
          await props.registroAction();
        }

        limpiarInputs(); // Limpia los campos después de un registro exitoso
        setShowSuccessModal(true); // Muestra el modal
      } catch (error) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          general: 'No se pudo completar el registro. Inténtalo de nuevo.',
        }));
      }
    }
    setLoading(false);
  };

  // Función para redirigir a la página de inicio de sesión
  const goToLogin = () => {
    router.push(""); // Ajusta esta ruta según la ruta de tu página de inicio de sesión
  };

  return (
    <>
      <IonGrid>
        {/* (El resto del formulario sigue igual) */}
        <IonRow>
          <IonCol size="12">
            <h1 className="titulo">Registro de Usuario</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4" offset="4">
            <IonInput
              label="Usuario"
              labelPlacement="floating"
              fill="outline"
              placeholder="Nombre de usuario"
              disabled={props.noEditable}
              className="usuario-input"
              clearInput
              type="text"
              value={formValues.usuario}
              onIonInput={(e) => handleChange(e, "usuario")}
            >
              <IonIcon slot="start" icon={personOutline} />
            </IonInput>
            {formErrors.usuario && <IonText color="danger">{formErrors.usuario}</IonText>}
            <br />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="4" offset="4">
            <IonInput
              label="Gmail"
              labelPlacement="floating"
              fill="outline"
              placeholder="Correo electrónico"
              disabled={props.noEditable}
              className="letras"
              clearInput
              type="email"
              value={formValues.gmail}
              onIonInput={(e) => handleChange(e, "gmail")}
            >
              <IonIcon slot="start" icon={mailOutline} />
            </IonInput>
            {formErrors.gmail && <IonText color="danger">{formErrors.gmail}</IonText>}
            <br />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="4" offset="4">
            <IonInput
              label="Contraseña"
              labelPlacement="floating"
              fill="outline"
              placeholder="Contraseña"
              className="letras"
              type={showPassword ? "text" : "password"}
              value={formValues.contraseña}
              onIonInput={(e) => handleChange(e, "contraseña")}
            >
              <IonIcon slot="start" icon={lockClosedOutline} />
              <IonIcon
                slot="end"
                icon={showPassword ? eyeOffOutline : eyeOutline}
                onClick={togglePasswordVisibility}
              />
            </IonInput>
            {formErrors.contraseña && <IonText color="danger">{formErrors.contraseña}</IonText>}
            <br />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="4" offset="4">
            <IonInput
              label="Confirmar Contraseña"
              labelPlacement="floating"
              fill="outline"
              placeholder="Confirmar contraseña"
              className="letras"
              type={showConfirmPassword ? "text" : "password"}
              value={formValues.confirmarContraseña}
              onIonInput={(e) => handleChange(e, "confirmarContraseña")}
            >
              <IonIcon slot="start" icon={lockClosedOutline} />
              <IonIcon
                slot="end"
                icon={showConfirmPassword ? eyeOffOutline : eyeOutline}
                onClick={toggleConfirmPasswordVisibility}
              />
            </IonInput>
            {formErrors.confirmarContraseña && <IonText color="danger">{formErrors.confirmarContraseña}</IonText>}
            <br />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="2" offset="5">
            <IonButton
              id="RegistroButton"
              onClick={handleSubmit}
              expand="full"
              className={`modificar-button ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Aceptar"}
            </IonButton>
          </IonCol>
        </IonRow>

        {formErrors.general && (
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonText color="danger">{formErrors.general}</IonText>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>

      <IonLoading isOpen={loading} message={"Por favor, espere..."} />

      {/* Modal de éxito */}
      <IonModal  isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <h2>¡Registro exitoso!</h2>
              <p>El usuario se ha registrado correctamente.</p>

              <IonButton expand="full" color="secondary"  onClick={async () => { 
                      await setShowSuccessModal(false);
                      goToLogin();
                      limpiarInputs();}} >
                Ir a Iniciar Sesión
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonModal>
    </>
  );
};

export default RegistroView;
