import { IonInput, IonLabel } from "@ionic/react";
import styles from "../sccs/CustomField.module.scss";
import { TextFieldTypes } from "@ionic/core"; // Importa el tipo de campo permitido

interface Field {
    id: string;
    label: string;
    input: {
        props: {
            type: TextFieldTypes;  // Asegúrate de usar TextFieldTypes
            placeholder: string;
        };
        state: {
            value: string;
            onIonChange: (e: CustomEvent) => void;
        };
    };
}

interface CustomFieldProps {
    field: Field;
    errors: string[];
}

const CustomField: React.FC<CustomFieldProps> = ({ field, errors }) => {
    const error = errors && errors.find(e => e === field.id);
    const errorMessage = error ? `Please check your ${field.id}` : null;

    return (
        <div className={styles.field}>
            <IonLabel className={styles.fieldLabel}>
                {field.label}
                {error && <p className="animate__animated animate__bounceIn">{errorMessage}</p>}
            </IonLabel>
            <IonInput
                className={styles.customInput}
                {...field.input.props}  // Asegúrate de que los props sean correctos
                {...field.input.state}  // Asegúrate de que el estado también lo sea
            />
        </div>
    );
};

export default CustomField;
