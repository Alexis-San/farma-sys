import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonLoading, IonRow, IonText } from "@ionic/react";
import { eyeOffOutline, eyeOutline, mailOutline, lockClosedOutline } from "ionicons/icons";
import React, { useState } from "react";
import "../theme/conf.css";

interface LoginProps {
  loginAction?: (email: string, password: string) => Promise<void>;
}

const LoginView: React.FC<LoginProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Validación del formulario
  const validateForm = () => {
    let errors = { ...formErrors };
    let isValid = true;

    // Validación para el correo electrónico
    if (!formValues.email.trim()) {
      errors.email = "El correo electrónico es obligatorio.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Por favor ingresa un correo electrónico válido.";
      isValid = false;
    }

    // Validación para la contraseña
    if (formValues.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
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
        if (props.loginAction) {
          await props.loginAction(formValues.email, formValues.password);
        }
      } catch (error) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          general: 'No se pudo iniciar sesión. Inténtalo de nuevo.',
        }));
      }
    }
    setLoading(false);
  };

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <h1 className="titulo">Iniciar Sesión</h1>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="4" offset="4">
            <IonInput
              label="Correo Electrónico"
              labelPlacement="floating"
              fill="outline"
              placeholder="Correo electrónico"
              clearInput
              type="email"
              value={formValues.email}
              onIonInput={(e) => handleChange(e, "email")}
            >
              <IonIcon slot="start" icon={mailOutline} />
            </IonInput>
            {formErrors.email && <IonText color="danger">{formErrors.email}</IonText>}
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
              value={formValues.password}
              onIonInput={(e) => handleChange(e, "password")}
            >
              <IonIcon slot="start" icon={lockClosedOutline} />
              <IonIcon
                slot="end"
                icon={showPassword ? eyeOffOutline : eyeOutline}
                onClick={togglePasswordVisibility}
              />
            </IonInput>
            {formErrors.password && <IonText color="danger">{formErrors.password}</IonText>}
            <br />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="2" offset="5">
            <IonButton
              onClick={handleSubmit}
              expand="full"
              className={`modificar-button ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
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
    </>
  );
};

export default LoginView;
