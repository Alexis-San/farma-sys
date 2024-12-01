import React from "react";
import jsPDF from "jspdf";
import { IonButton } from "@ionic/react";

interface PDFGeneratorProps {
  cart: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  customerName: string;
  CI: string; //para traer numero de cedula
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ cart, customerName, CI }) => {
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 200], // Formato ticket
    });

    const imgPath = "/Farmapueblo.png";
    const image = new Image();
    image.src = imgPath;

    image.onload = () => {
      // Ajustar el tamaño y centrar el logo
      const logoWidth = 40; // Nuevo ancho del logo
      const logoHeight = 25; // Nuevo alto del logo
      const pageWidth = 80; // Ancho de la página
      const xPosition = (pageWidth - logoWidth) / 2; // Centrar horizontalmente
      const yPosition = 3; // Posición vertical
    
      // Agregar el logo al documento
      doc.addImage(image, "PNG", xPosition, yPosition, logoWidth, logoHeight);

      // Encabezado
      doc.setFontSize(14);
      doc.text("***Uso interno***", 22, 27);
      doc.setFontSize(10);
      doc.text("Tel.: +595 982 126400", 5, 35);
      doc.text(`Cliente: ${customerName}`, 5, 40);
      doc.text(`CI/RUC: ${CI}`, 5, 44);

      // Línea divisoria
      doc.line(5, 46, 75, 46);

      // Tabla encabezado
      doc.setFontSize(10);
      doc.text("Cant", 5, 50);
      doc.text("Artículo", 15, 50);
      doc.text("Subtotal", 50, 50);
      doc.line(5, 52, 75, 52); // Línea bajo el encabezado

      // Productos
      let y = 57; // Posición inicial para productos
      cart.forEach((product) => {
        const subtotal = product.price * product.quantity;
        doc.setFontSize(8);
        doc.text(`${product.quantity}`, 5, y);
        doc.text(doc.splitTextToSize(product.title, 30), 15, y);
        doc.text(`${subtotal.toFixed(2)}`, 65, y, { align: "right" });
        y += 9;
      });

      // Línea divisoria antes del total
      doc.line(5, y+=2, 75, y);

      // Total
      const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
      y += 8;
      doc.setFontSize(12);
      doc.text(`Total: $${total.toFixed(2)}`, 5, y);

      // Guardar PDF
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
