import { useState, ChangeEvent } from "react";



// Función para manejar la entrada del formulario
export const useFormInput = (initialValue: string = "") => {
    const [value, setValue] = useState<string>(initialValue);

    const handleIonChange = (e: CustomEvent) => {
        const tempValue = e.detail.value; // Obtener el valor de CustomEvent
        setValue(tempValue);
    };

    return {
        value,
        onIonChange: handleIonChange, // Método de cambio para IonInput
    };
};


interface Error {
    id: string;
    message: string;
}

export const validateForm = (fields: { id: string; required: boolean; input: { state: { value: string } } }[]): Error[] => {
    let errors: Error[] = [];

    fields.forEach(field => {
        if (field.required) {
            const fieldValue = field.input.state.value;

            if (fieldValue === "") {
                const error: Error = {
                    id: field.id,
                    message: `Please check your ${field.id}`,
                };
                errors.push(error);
            }
        }
    });

    return errors;
};
