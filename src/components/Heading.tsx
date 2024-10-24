import { IonButton, IonCol, IonRow } from "@ionic/react";
import styles from "../sccs/Heading.module.scss";

// Define the types for the props
interface HeadingProps {
  heading: string;
  buttonClick?: () => void;
  buttonText?: string;
}

export const Heading: React.FC<HeadingProps> = ({ heading, buttonClick, buttonText }) => (
  <IonRow>
    <IonCol size="12" className={styles.heading}>
      <h5>{heading}</h5>
      {buttonClick && (
        <IonButton fill="clear" onClick={buttonClick}>
          {buttonText} &rarr;
        </IonButton>
      )}
    </IonCol>
  </IonRow>
);
