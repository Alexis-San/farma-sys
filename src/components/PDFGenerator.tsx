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
  customerName: string;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ cart, customerName }) => {
  const generatePDF = () => {
    // Crear una instancia de jsPDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 200],
    });

    // Cargar la imagen como base64 desde /public
    const imgPath = "/Farmapueblo.png";  // Ruta relativa directa
    const image = new Image();
    image.src = imgPath;

    image.onload = () => {
      // Agregar la imagen al PDF después de cargarla
      doc.addImage(image, "PNG", 25, 5, 30, 20); // Ajusta las coordenadas según sea necesario

      // Encabezado de texto
      doc.setFontSize(12);
      doc.text("Farma Pueblo", 5, 30);
      doc.setFontSize(10);
      doc.text("Tel.: +595 982 126400", 5, 35);
      doc.text(`Cliente: ${customerName}`, 5, 40);

      // Productos
      let y = 50; // Margen inicial vertical después del encabezado
      cart.forEach((product, index) => {
        const productLine = `${index + 1}. ${product.title} - ${product.quantity} x $${product.price.toFixed(2)}`;
        doc.text(doc.splitTextToSize(productLine, 70), 5, y);
        y += 10; // Incrementar posición para evitar solapamiento
      });

      // Total
      const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
      doc.setFontSize(12);
      doc.text(`Total: $${total.toFixed(2)}`, 5, y + 10);

      // Descargar PDF
      doc.save("Recibo.pdf");
    };

    image.onerror = () => {
      console.error("No se pudo cargar la imagen.");
    };
  };

  return (
    <IonButton expand="block" color="danger" onClick={generatePDF}>
      IMPRIMIR RECIBO
    </IonButton>
  );
};

export default PDFGenerator;

