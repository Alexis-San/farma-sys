export interface InventarioType {
    id_producto_inventario:number,
    precio_compra: number,
    precio_venta: number,
    descripcion: string,
    fecha_vencimiento: string,
    stock: number,
    lote: number,
    createdAt?:string,
    updatedAt?:string


}