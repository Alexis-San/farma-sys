// Enums for fixed values
export type CondicionVenta = "VENTA LIBRE" | "BAJO RECETA";
export type Procedencia = "NACIONAL" | "IMPORTADO";

// Interface for nested Producto
export interface ProductoType {
  id?: number;
  codigo_cafapar?: number;
  nombre_comercial?: string;
  presentacion?: string;
  descripcion?: string;
  precio_venta?: number;
  condicion_venta?: CondicionVenta;
  procedencia?: Procedencia;
  laboratorioId?: number;
}

// Main Inventario interface
export interface InventarioType {
  id: number;
  precio_venta: number;
  precio_compra: number;
  descripcion: string;
  fecha_vencimiento: string; // ISO date string from API
  stock: number;
  estado: boolean;
  productoId: number;
  producto: ProductoType; // Include nested producto object
}
