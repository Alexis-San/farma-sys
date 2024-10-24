import { useFormInput } from "./utils";

// Interfaz para definir la estructura de los campos
interface Field {
    id: string;
    label: string;
    required: boolean;
    input: {
        props: {
            type: string;
            placeholder: string;
        };
        state: ReturnType<typeof useFormInput>;
    };
}

// Hook para campos de registro
export const useSignupFields = (): Field[] => {
    const nombre = useFormInput("");
    const correo = useFormInput("");
    const contraseña = useFormInput("");

    return [
        {
            id: "nombre",
            label: "Nombre",
            required: true,
            input: {
                props: {
                    type: "text",
                    placeholder: "Joe Bloggs"
                },
                state: nombre
            }
        },
        {
            id: "correo",
            label: "Correo electrónico",
            required: true,
            input: {
                props: {
                    type: "email",
                    placeholder: "joe@bloggs.com"
                },
                state: correo
            }
        },
        {
            id: "contraseña",
            label: "Contraseña",
            required: true,
            input: {
                props: {
                    type: "password",
                    placeholder: "*********"
                },
                state: contraseña
            }
        }
    ];
};

// Hook para campos de inicio de sesión
export const useLoginFields = (): Field[] => {
    const correo = useFormInput("");
    const contraseña = useFormInput("");

    return [
        {
            id: "correo",
            label: "Correo electrónico",
            required: true,
            input: {
                props: {
                    type: "email",
                    placeholder: "joe@bloggs.com"
                },
                state: correo
            }
        },
        {
            id: "contraseña",
            label: "Contraseña",
            required: true,
            input: {
                props: {
                    type: "password",
                    placeholder: "*******"
                },
                state: contraseña
            }
        }
    ];
};

export type { Field }; // Exporta la interfaz Field

