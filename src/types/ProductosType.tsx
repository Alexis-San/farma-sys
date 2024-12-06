export interface ProductosType {
  id: number;
  nombre_comercial: string;
  presentacion: string;
  precio_venta: number;
  condicion_venta: "BAJO RECETA" | "VENTA LIBRE";
  procedencia: "NACIONAL" | "IMPORTADO";
  laboratioId?: number;
  Laboratorio?: {
    nombre: string;
  };
  Proveedores?: any[];
  Actuadores?: any[];
  Categorias?: any[];
  codigo_cafapar?: number;
  descripcion?: string;
}
