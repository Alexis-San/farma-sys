let productos = [
    { id: 1, descripcion: "RICA C", precioCompra: 20000, precioVenta: 38000, vencimiento: "2024-09-12", stock: 3, lote: 2 },
    // Agrega más productos de ejemplo según necesites
  ];
  
  class Database {
    getAllProductos() {
      return productos;
    }
  
    addProducto(producto) {
      const newId = productos.length ? productos[productos.length - 1].id + 1 : 1;
      const nuevoProducto = { id: newId, ...producto };
      productos.push(nuevoProducto);
      return nuevoProducto;
    }
  
    updateProducto(id, productoActualizado) {
      const index = productos.findIndex((producto) => producto.id === id);
      if (index !== -1) {
        productos[index] = { id, ...productoActualizado };
        return productos[index];
      }
      return null;
    }
  
    deleteProducto(id) {
      const index = productos.findIndex((producto) => producto.id === id);
      if (index !== -1) {
        productos.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  
  module.exports = new Database();
  