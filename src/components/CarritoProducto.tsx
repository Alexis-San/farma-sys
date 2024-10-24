import { IonBadge, IonCol } from "@ionic/react";
import styles from "../sccs/CarritoProducto.module.scss";

// Define la estructura del tipo Product
interface Product {
  price: number;
  title: string;
  image: string;
}

// Define los tipos de las props que espera el componente
interface CartProductProps {
  product: Product;
  click?: () => void;
  fromHome?: boolean;
}

export const CartProduct: React.FC<CartProductProps> = ({ product, click, fromHome = false }) => {
  return (
    <IonCol 
      size="12" 
      onClick={click} 
      className={!fromHome ? "animate__animated animate__faster animate__slideInRight" : undefined}
    >
      <div className="productContainer">
        <div className="productInfo">
          <div>
            <IonBadge color="primary">£{product.price.toFixed(2)}</IonBadge>
          </div>
        </div>
        <h1 className={`${styles.productTitle} truncate`}>{product.title}</h1>
        <div
          style={{ backgroundImage: `url(${product.image})` }}
          className={styles.coverImage}
        />
      </div>
    </IonCol>
  );
};
