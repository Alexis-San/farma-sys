import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
} from "@ionic/react";
import { InventarioType, ProductoType } from "../../types/InventarioType";
import axios from "axios";
import {
  createOutline,
  trashOutline,
  addCircleOutline,
  add,
} from "ionicons/icons";

const URI = "http://localhost:8000/api/inventario/";
const PRODUCTOS_URI = "http://localhost:8000/api/productos/";

const InventarioList: React.FC = () => {
  const [data, setData] = useState<InventarioType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productos, setProductos] = useState<ProductoType[]>([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [showInventarioModal, setShowInventarioModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductoType | null>(
    null
  );
  const [nuevoInventario, setNuevoInventario] = useState({
    stock: 0,
    lote: "",
    precio_venta: 0,
    precio_compra: 0,
    fecha_vencimiento: new Date().toISOString(),
    productoId: 0,
  });
  const [showModificarModal, setShowModificarModal] = useState(false);
  const [inventarioSeleccionado, setInventarioSeleccionado] =
    useState<InventarioType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<InventarioType[]>(URI);
        setData(response.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProductos = async () => {
    setLoadingProductos(true);
    try {
      const response = await axios.get<ProductoType[]>(PRODUCTOS_URI);
      setProductos(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoadingProductos(false);
    }
  };

  const handleAddClick = () => {
    setShowProductModal(true);
    fetchProductos();
  };

  const handleProductSelect = (producto: ProductoType) => {
    setSelectedProduct(producto);
    setNuevoInventario({
      ...nuevoInventario,
      productoId: producto.id || 0,
      precio_venta: producto.precio_venta || 0,
    });
    setShowProductModal(false);
    setShowInventarioModal(true);
  };

  const handleInventarioChange = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === "fecha_vencimiento") {
      // Validar formato de fecha dd/mm/yyyy
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(value) && value !== "") return;

      // Convertir dd/mm/yyyy a ISO string si es una fecha válida
      if (value && dateRegex.test(value)) {
        const [day, month, year] = value.split("/");
        const isoDate = `${year}-${month}-${day}T00:00:00.000Z`;
        setNuevoInventario({
          ...nuevoInventario,
          fecha_vencimiento: isoDate,
        });
      } else {
        setNuevoInventario({
          ...nuevoInventario,
          fecha_vencimiento: value,
        });
      }
    } else {
      setNuevoInventario({
        ...nuevoInventario,
        [name]: value,
      });
    }
  };

  const guardarInventario = async () => {
    try {
      const response = await axios.post(URI, nuevoInventario);
      // Agregamos el producto seleccionado al nuevo registro antes de actualizar el estado
      const nuevoRegistro = {
        ...response.data,
        producto: selectedProduct,
      };
      setData([...data, nuevoRegistro]);
      setShowInventarioModal(false);
      // Reset form
      setSelectedProduct(null);
      setNuevoInventario({
        stock: 0,
        lote: "",
        precio_venta: 0,
        precio_compra: 0,
        fecha_vencimiento: new Date().toISOString(),
        productoId: 0,
      });
    } catch (error) {
      console.error("Error al guardar el inventario:", error);
    }
  };

  const handleModificarClick = (item: InventarioType) => {
    setInventarioSeleccionado(item);
    setShowModificarModal(true);
  };

  const handleModificarChange = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (inventarioSeleccionado) {
      setInventarioSeleccionado({
        ...inventarioSeleccionado,
        [name]: value,
      });
    }
  };

  const guardarModificacion = async () => {
    if (inventarioSeleccionado) {
      try {
        await axios.put(
          `${URI}${inventarioSeleccionado.id}`,
          inventarioSeleccionado
        );
        setData(
          data.map((item) =>
            item.id === inventarioSeleccionado.id
              ? inventarioSeleccionado
              : item
          )
        );
        setShowModificarModal(false);
        setInventarioSeleccionado(null);
      } catch (error) {
        console.error("Error al modificar el inventario:", error);
      }
    }
  };

  return (
    <>
      <IonGrid className="tabla">
        {/* Botón Agregar */}
        <IonHeader>
          <IonToolbar>
            <IonButton color="success" size="default" onClick={handleAddClick}>
              <IonIcon slot="start" icon={addCircleOutline} />
              Agregar Inventario
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonRow
          className="encabezado"
          style={{
            background: "#f0f0f0",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <IonCol size="1">ID</IonCol>
          <IonCol size="2">Nombre</IonCol>
          <IonCol size="1">Stock</IonCol>
          <IonCol size="1">Lote</IonCol>
          <IonCol size="1.5">Precio Venta</IonCol>
          <IonCol size="1.5">Precio Compra</IonCol>
          <IonCol size="1.5">Vencimiento</IonCol>
          <IonCol size="1">Condición Venta</IonCol>
          <IonCol size="1.5">Acciones</IonCol>
        </IonRow>

        {/* Mostrar mensaje de carga */}
        {loading && (
          <IonRow>
            <IonCol>
              <IonText>Cargando datos...</IonText>
            </IonCol>
          </IonRow>
        )}

        {/* Mostrar filas si hay datos */}
        {data.map((item) => (
          <IonRow
            key={item.id}
            style={{ textAlign: "center", verticalAlign: "middle" }}
          >
            <IonCol size="1">
              <IonText>{item.id}</IonText>
            </IonCol>
            <IonCol size="2">
              <IonText>{item.producto?.nombre_comercial}</IonText>
            </IonCol>
            <IonCol size="1">
              <IonText>{item.stock}</IonText>
            </IonCol>
            <IonCol size="1">
              <IonText>{item.lote}</IonText>
            </IonCol>
            <IonCol size="1.5">
              <IonText>{item.precio_venta}</IonText>
            </IonCol>
            <IonCol size="1.5">
              <IonText>{item.precio_compra}</IonText>
            </IonCol>
            <IonCol size="1.5">
              <IonText>
                {new Date(item.fecha_vencimiento).toLocaleDateString()}
              </IonText>
            </IonCol>
            <IonCol size="1">
              <IonText>{item.producto?.condicion_venta}</IonText>
            </IonCol>
            <IonCol size="1.5">
              <IonButton
                color="primary"
                size="small"
                onClick={() => handleModificarClick(item)}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        ))}

        {/* Mostrar mensaje si no hay datos */}
        {!loading && data.length === 0 && (
          <IonRow>
            <IonCol>
              <IonText>No hay datos disponibles</IonText>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>

      {/* Modal de selección de producto */}
      <IonModal
        isOpen={showProductModal}
        onDidDismiss={() => setShowProductModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Seleccionar Producto</IonTitle>
            <IonButton slot="end" onClick={() => setShowProductModal(false)}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow
              className="encabezado"
              style={{
                background: "#f0f0f0",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <IonCol size="2">ID</IonCol>
              <IonCol size="6">Nombre Comercial</IonCol>
              <IonCol size="2">Precio Venta</IonCol>
              <IonCol size="2">Acción</IonCol>
            </IonRow>

            {loadingProductos ? (
              <IonRow>
                <IonCol>
                  <IonText>Cargando productos...</IonText>
                </IonCol>
              </IonRow>
            ) : (
              productos.map((producto) => (
                <IonRow key={producto.id} style={{ textAlign: "center" }}>
                  <IonCol size="2">{producto.id}</IonCol>
                  <IonCol size="6">{producto.nombre_comercial}</IonCol>
                  <IonCol size="2">{producto.precio_venta}</IonCol>
                  <IonCol size="2">
                    <IonButton
                      size="small"
                      color="success"
                      onClick={() => handleProductSelect(producto)}
                    >
                      <IonIcon slot="icon-only" icon={add} />
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))
            )}
          </IonGrid>
        </IonContent>
      </IonModal>

      {/* Modal de agregar inventario */}
      <IonModal
        isOpen={showInventarioModal}
        onDidDismiss={() => setShowInventarioModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Agregar al Inventario</IonTitle>
            <IonButton slot="end" onClick={() => setShowInventarioModal(false)}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedProduct && (
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">
                      Producto Seleccionado
                    </IonLabel>
                    <IonInput
                      value={selectedProduct.nombre_comercial}
                      readonly
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Stock</IonLabel>
                    <IonInput
                      type="number"
                      name="stock"
                      value={nuevoInventario.stock}
                      onIonChange={handleInventarioChange}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Lote</IonLabel>
                    <IonInput
                      name="lote"
                      value={nuevoInventario.lote}
                      onIonChange={handleInventarioChange}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Precio Venta</IonLabel>
                    <IonInput
                      type="number"
                      name="precio_venta"
                      value={nuevoInventario.precio_venta}
                      onIonChange={handleInventarioChange}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Precio Compra</IonLabel>
                    <IonInput
                      type="number"
                      name="precio_compra"
                      value={nuevoInventario.precio_compra}
                      onIonChange={handleInventarioChange}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Fecha Vencimiento (dd/mm/yyyy)
                    </IonLabel>
                    <IonInput
                      name="fecha_vencimiento"
                      value={nuevoInventario.fecha_vencimiento
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                      onIonChange={handleInventarioChange}
                      placeholder="dd/mm/yyyy"
                    />
                  </IonItem>
                  <IonButton expand="full" onClick={guardarInventario}>
                    Guardar
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
        </IonContent>
      </IonModal>

      {/* Modal de modificar inventario */}
      <IonModal
        isOpen={showModificarModal}
        onDidDismiss={() => setShowModificarModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modificar Inventario</IonTitle>
            <IonButton slot="end" onClick={() => setShowModificarModal(false)}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {inventarioSeleccionado && (
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">Producto</IonLabel>
                    <IonInput
                      value={inventarioSeleccionado.producto?.nombre_comercial}
                      readonly
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Stock</IonLabel>
                    <IonInput
                      type="number"
                      name="stock"
                      value={inventarioSeleccionado.stock}
                      onIonChange={handleModificarChange}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Lote</IonLabel>
                    <IonInput
                      name="lote"
                      value={inventarioSeleccionado.lote}
                      onIonChange={handleModificarChange}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Precio Venta</IonLabel>
                    <IonInput
                      type="number"
                      name="precio_venta"
                      value={inventarioSeleccionado.precio_venta}
                      onIonChange={handleModificarChange}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Precio Compra</IonLabel>
                    <IonInput
                      type="number"
                      name="precio_compra"
                      value={inventarioSeleccionado.precio_compra}
                      onIonChange={handleModificarChange}
                    />
                  </IonItem>
                  <IonButton expand="full" onClick={guardarModificacion}>
                    Guardar Cambios
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default InventarioList;
