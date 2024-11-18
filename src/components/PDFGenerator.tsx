import React from "react";
import jsPDF from "jspdf";
import { IonButton } from "@ionic/react";

interface PDFGeneratorProps {
    cart: Array<{
        id: string;
        title: string;
        price: number;
        quantity: number;
    }>;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ cart }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Configuración del documento
        doc.text("Farma Pueblo", 10, 10);
        doc.text("Tel.: +595 982 126400", 10, 10);

        let y = 20; // Margen inicial vertical
        cart.forEach((product, index) => {
            const productLine = `${index + 1}. ${product.title.padEnd(
                20,
                " "
            )} - Cantidad: ${product.quantity} - Precio: $${product.price.toFixed(2)}`;
            doc.text(productLine, 10, y);
            y += 10; // Incrementar para evitar solapamiento
        });

        // Total final
        const total = cart.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
        );
        doc.text(`Total: $${total.toFixed(2)}`, 10, y + 10);

        // Descargar el PDF
        doc.save("Carrito.pdf");
    };

    return (
        <IonButton
        expand="block"
        color= "danger"
        className="btn btn-primary"
        onClick={generatePDF}
    >
        IMPRIMIR
    </IonButton>

    );
};


export default PDFGenerator;
