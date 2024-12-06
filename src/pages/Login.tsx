import {
  IonButton,
  IonImg,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
  IonText,
} from "@ionic/react";
import { IonIcon } from "@ionic/react";
import "../theme/Login.css";
import React, { useState } from "react";
import { eyeOff, eye } from "ionicons/icons";

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [gmail, setGmail] = useState(""); // Estado para el correo electrónico (gmail)
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [loading, setLoading] = useState(false); // Estado para el loading
  const [error, setError] = useState(""); // Estado para errores de login

  const doRegistro = () => {
    navigation.push(`/Registro?key=${Date.now()}`, "forward", "replace");
  };

  const doLogin = async () => {
    setLoading(true); // Inicia el estado de carga

    try {
      const response = await fetch("http://localhost:8000/api/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: gmail, password: password }), // Envia el correo electrónico y la contraseña
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas.");
      }

      const data = await response.json();
      console.log("Usuario logueado:", data);

      // Redirige al usuario a la página del menú si el login es exitoso
      navigation.push("/menu/inicio", "forward", "replace");
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, intenta nuevamente.");
      console.error("Error en el login:", error);
    } finally {
      setLoading(false); // Detiene el estado de carga
    }
  };

  const doLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/login/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al desloguear.");
      }

      // Acción después de desloguear exitosamente
      console.log("Usuario deslogueado");
      navigation.push("/", "forward", "replace");
    } catch (error) {
      console.error("Error en el logout:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>LOGIN</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol
              sizeXs="12"
              sizeSm="8"
              sizeMd="6"
              sizeLg="4"
              offsetSm="2"
              offsetMd="3"
              offsetLg="4"
            >
              <IonImg
                src="../public/Farmapueblo.png"
                alt="Logo"
                className="custom-image"
              ></IonImg>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol
              sizeXs="12"
              sizeSm="8"
              sizeMd="6"
              sizeLg="4"
              offsetSm="2"
              offsetMd="3"
              offsetLg="4"
            >
              <IonInput
                label="Correo Electrónico"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingresa tu correo electrónico"
                className="ion-input"
                value={gmail} // Vincula el valor con el estado de gmail
                onIonInput={(e) => setGmail(e.detail.value!)} // Actualiza el estado cuando se cambia el input
              />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol
              sizeXs="12"
              sizeSm="8"
              sizeMd="6"
              sizeLg="4"
              offsetSm="2"
              offsetMd="3"
              offsetLg="4"
            >
              <div className="password-item">
                <IonInput
                  type={showPassword ? "text" : "password"}
                  label="Contraseña"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingresa tu contraseña"
                  className="password-input"
                  value={password} // Vincula el valor con el estado de password
                  onIonInput={(e) => setPassword(e.detail.value!)} // Actualiza el estado cuando se cambia el input
                />
                <IonButton
                  fill="clear"
                  className="password-toggle-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <IonIcon icon={showPassword ? eyeOff : eye} />
                </IonButton>
              </div>
            </IonCol>
          </IonRow>

          {/* Mostrar mensaje de error si ocurre uno */}
          {error && (
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonText color="danger">{error}</IonText>
              </IonCol>
            </IonRow>
          )}

          <IonRow>
            <IonCol sizeXs="12" sizeSm="6" offsetSm="3" sizeMd="4" offsetMd="4">
              <IonButton
                onClick={async () => {
                  await doLogout();
                  await doLogin();
                }}
                expand="full"
                className="ion-button"
                color="secondary"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Ingresar"}
              </IonButton>
            </IonCol>
            <IonCol sizeXs="12" sizeSm="6" offsetSm="3" sizeMd="4" offsetMd="4">
              <IonButton
                onClick={doRegistro}
                expand="full"
                className="ion-button"
                color="secondary"
              >
                Registro
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
