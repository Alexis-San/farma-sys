interface Actuador {
  id: number;
  nombre: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface Proveedor {
  id: number;
  nombre: string;
}

export interface ProductosType {
  id: number;
  nombre_comercial: string;
  presentacion: string;
  precio_venta: number;
  condicion_venta: "BAJO RECETA" | "VENTA LIBRE";
  procedencia: "NACIONAL" | "IMPORTADO";
  Laboratorio?: {
    nombre: string;
  };
  Proveedores?: Proveedor[];
  Actuadores?: Actuador[];
  Categorias?: Categoria[];
  codigo_cafapar?: number;
  descripcion?: string;
}
