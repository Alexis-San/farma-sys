import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonBadge,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonItem,
  IonList,
  IonLabel,
} from "@ionic/react";
import { InventarioType, ProductoType } from "../../types/InventarioType";
import axios from "axios";
import {
  createOutline,
  addCircleOutline,
  add,
  warningOutline,
  downloadOutline,
  alertCircleOutline,

} from "ionicons/icons";
import ModificarInventarioModal from "./ModificarInventarioModal";
import AgregarInventarioModal from "./AgregarInventarioModal";
import "../InventarioList.css";
import ExportarStockBajo from "../ExcelGenerator";

const URI = "http://localhost:8000/api/inventario/";
const PRODUCTOS_URI = "http://localhost:8000/api/productos/";

const InventarioList: React.FC = () => {
  const [data, setData] = useState<InventarioType[]>([]);
  const [loading, setLoading] = useState(true);
  const [stockBajo, setStockBajo] = useState<InventarioType[]>([]); // Estado para productos con stock bajo
  const [showStockBajoModal, setShowStockBajoModal] = useState(false); // Control del modal
  const[showProductosaVencer, setShowProductosaVencer]=useState(false); // Control del modal lista de vencer
  const [productosProntoAVencer, setProductosProntoAVencer] = useState<InventarioType[]>([]);
  // Estados para agregar productos
  const [showProductModal, setShowProductModal] = useState(false);
  const [productos, setProductos] = useState<ProductoType[]>([]);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductoType | null>(
    null
  );
  const [showInventarioModal, setShowInventarioModal] = useState(false);
  const [nuevoInventario, setNuevoInventario] = useState({
    stock: 0,
    lote: "",
    precio_venta: 0,
    precio_compra: 0,
    fecha_vencimiento: new Date().toISOString(),
    productoId: 0,
  });

  // Estados para modificar inventario
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

  const handleInventarioChange1 = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setNuevoInventario({
      ...nuevoInventario,
      [name]: value,
    });

  };


  const handleInventarioChange = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (inventarioSeleccionado) {
      setInventarioSeleccionado({
        ...inventarioSeleccionado,
        [name]: value,
      });
    }
  };

  const convertirAISO = (fecha: string): string => {
    const [dia, mes, año] = fecha.split("/"); // dd/mm/yyyy
    const fechaObj = new Date(Number(año), Number(mes) - 1, Number(dia) +1); // Mes - 1 porque los meses en JS comienzan desde 0
    fechaObj.setHours(0, 0, 0, 0); // Asegura que la hora sea 00:00:00
    return fechaObj.toISOString().split("T")[0]; // Devuelve la fecha en formato yyyy-mm-dd
  };

  const guardarInventario = async () => {
    try {
      // Convertir fecha_vencimiento al formato ISO 8601
      const fechaISO = convertirAISO(nuevoInventario.fecha_vencimiento);
  
      // Crear un nuevo objeto con la fecha convertida
      const inventarioConFechaISO = {
        ...nuevoInventario,
        fecha_vencimiento: fechaISO,
      };
  
      // Enviar los datos al backend
      const response = await axios.post(URI, inventarioConFechaISO);
  
      // Agregar el nuevo registro a la lista
      const nuevoRegistro = {
        ...response.data,
        producto: selectedProduct,
      };
      setData([...data, nuevoRegistro]);
      setShowInventarioModal(false);
    } catch (error) {
      console.error("Error al guardar el inventario:", error);
    }
  };

  const modificarInventario = async () => {
    if (inventarioSeleccionado) {
      try {
        const updatedInventario = {
          ...inventarioSeleccionado,
          stock: inventarioSeleccionado.stock,
          lote: inventarioSeleccionado.lote,
          precio_venta: inventarioSeleccionado.precio_venta,
          precio_compra: inventarioSeleccionado.precio_compra,
          fecha_vencimiento: inventarioSeleccionado.fecha_vencimiento,
        };

        const response = await axios.put(
          `${URI}${inventarioSeleccionado.id}`,
          updatedInventario
        );

        // Actualizar el inventario local con los datos modificados
        setData((prevData) =>
          prevData.map((item) =>
            item.id === response.data.id ? response.data : item
          )
        );
        setShowModificarModal(false);
      } catch (error) {
        console.error("Error al modificar el inventario:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<InventarioType[]>(URI);
        console.log('Datos del inventario:', response.data); // Verificar datos iniciales
        setData(response.data);
        filtrarStockBajo(response.data);
        filtrarProductosProntoAVencer(response.data, 60);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const filtrarProductosProntoAVencer = (productos: InventarioType[], dias: number) => {
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaActual.getDate() + dias);
  
    const fechaInicio = new Date();
    fechaInicio.setDate(fechaActual.getDate() - 730); // 7 días atrás
  
    const productosProntoAVencer = productos.filter((item) => {
      const fechaVencimiento = new Date(item.fecha_vencimiento);
      return (
        fechaVencimiento <= fechaLimite && 
        fechaVencimiento >= fechaInicio
      );
    });
  
    console.log('Productos a vencer filtrados:', productosProntoAVencer);
    setProductosProntoAVencer(productosProntoAVencer);
  };
  
 
  useEffect(() => {
    console.log('Estado de productos a vencer:', productosProntoAVencer);
  }, [productosProntoAVencer]);
  

  // Filtrar productos con stock bajo
  const filtrarStockBajo = (productos: InventarioType[]) => {
    const bajoStock = productos.filter((item) => item.stock && item.stock < 10); /// STOCK BAJO LISTA///////
    setStockBajo(bajoStock);
  };

  return (
    <>
      <IonGrid>
        <IonHeader>
          <IonToolbar>
            {/* Boton para agregar inventario */}
            <IonButton color="success" size="default" onClick={handleAddClick}>
              <IonIcon slot="start" icon={addCircleOutline} />
              Agregar Inventario
            </IonButton>

            {/* Boton para el informe de stock bajo */}
            <IonButton
              color="warning"
              size="default"
              onClick={() => setShowStockBajoModal(true)}
            >
              <IonIcon slot="start" icon={warningOutline} />
              Informe Stock Bajo
            </IonButton>

            {/* Boton para el informe de Vencimiento*/}
            <IonButton
              color="danger"
              size="default"
              onClick={() => setShowProductosaVencer(true)}
            >
              <IonIcon slot="start" icon={alertCircleOutline} />
              PRODUCTOS A VENCER
            </IonButton>

          </IonToolbar>
        </IonHeader>

        {/* Tabla de inventario */}
        <IonRow
          className="encabezado"
          style={{
            background: "#f0f0f0",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <IonCol size="0.5">ID</IonCol>
          <IonCol size="3">Nombre</IonCol>
          <IonCol size="1">Stock</IonCol>
          <IonCol size="1">Lote</IonCol>
          <IonCol size="1.5">Precio Venta</IonCol>
          <IonCol size="1">Precio Compra</IonCol>
          <IonCol size="1.5">Vencimiento</IonCol>
          <IonCol size="1.5">Condicion Venta</IonCol>
          <IonCol size="1">Acciones</IonCol>
        </IonRow>

        {data.map((item) => (
          <IonRow
            key={item.id}
            style={{ textAlign: "center", verticalAlign: "middle" }}
          >
            <IonCol size="0.5">
              <IonText>{item.id}</IonText>
            </IonCol>
            <IonCol size="3">
              <IonText>{item.producto?.nombre_comercial}</IonText>
            </IonCol>
            <IonCol size="1">
              <IonText>{item.stock}</IonText>
              {/* Badge para indicar stock bajo */}
              {item.stock &&
                item.stock < 10 && ( /// STOCK BAJO INDICADOR///////
                  <IonBadge color="warning" className="lowStockBadge">
                    Bajo
                  </IonBadge>
                )}
            </IonCol>
            <IonCol size="1">
              <IonText>{item.lote}</IonText>
            </IonCol>
            <IonCol size="1.5">
              <IonText>{item.precio_venta}</IonText>
            </IonCol>
            <IonCol size="1">
              <IonText>{item.precio_compra}</IonText>
            </IonCol>
            <IonCol size="1.5">
              <IonText>
                {new Date(item.fecha_vencimiento).toLocaleDateString()} 
              </IonText>
                {/*CONDICION PARA PRODUCTOS A VENCER*/}
              {item.fecha_vencimiento &&
                new Date(item.fecha_vencimiento) <= new Date(new Date().setDate(new Date().getDate() + 60)) && (
                  <IonBadge color="danger" className="vencimientoBadge"> 
                  <IonIcon className="vencimiento" icon={alertCircleOutline}></IonIcon>
                  </IonBadge>
                )}
            </IonCol>
            <IonCol size="1.5">
              <IonText>{item.producto?.condicion_venta}</IonText>
            </IonCol>
            <IonCol size="1">
              <IonButton
                color="primary"
                size="small"
                onClick={() => {
                  setInventarioSeleccionado(item);
                  setShowModificarModal(true);
                }}
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

      {/* Modal para informe de stock bajo */}
      <IonModal
        isOpen={showStockBajoModal}
        onDidDismiss={() => setShowStockBajoModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonRow>
              <IonCol size="3.7">
                <ExportarStockBajo />
              </IonCol>
              <IonCol size="6.3">
                <IonTitle className="Texto">Productos con Stock Bajo</IonTitle>
              </IonCol>
              <IonCol size="2">
                <IonButton onClick={() => setShowStockBajoModal(false)}>
                  Cerrar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList>
            {stockBajo.map((item) => (
              <IonItem key={item.id}>
                <IonLabel>
                  <h2>{item.producto?.nombre_comercial}</h2>
                  <p>Stock: {item.stock}</p>
                  <p>Lote: {item.lote}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>

            {/* Modal para informe de Vencimientos */}
            <IonModal
        isOpen={showProductosaVencer}
        onDidDismiss={() => setShowProductosaVencer(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonRow>
              <IonCol size="3.7">
              </IonCol>
              <IonCol size="6.3">
                <IonTitle className="Texto">Productos a Vencer</IonTitle>
              </IonCol>
              <IonCol size="2">
                <IonButton onClick={() => setShowProductosaVencer(false)}>
                  Cerrar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList>
            {productosProntoAVencer.map((item) => (
              <IonItem key={item.id}>
                <IonLabel>
                  <h2>{item.producto?.nombre_comercial}</h2>
                  <p>Stock: {item.stock}</p>
                  <p>Lote: {item.lote}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>

      {/* Modal de seleccion de producto */}
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
          <IonSearchbar
            value={searchText}
            onIonInput={(e: any) => setSearchText(e.target.value)}
            debounce={0}
            showClearButton="focus"
            placeholder="Buscar por nombre comercial"
          />
          <IonGrid>
            {productos
              .filter(
                (producto) =>
                  producto.nombre_comercial &&
                  producto.nombre_comercial
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
              )
              .map((producto) => (
                <IonRow key={producto.id}>
                  <IonCol size="9.5">{producto.nombre_comercial}</IonCol>
                  <IonCol size="2.5">
                    <IonButton
                      size="small"
                      color="success"
                      onClick={() => handleProductSelect(producto)}
                    >
                      Agregar <IonIcon slot="end" icon={add} />
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
          </IonGrid>
        </IonContent>
      </IonModal>

      {/* Modal de agregar inventario */}
      <AgregarInventarioModal
        isOpen={showInventarioModal}
        productoSeleccionado={selectedProduct}
        inventario={nuevoInventario}
        onClose={() => setShowInventarioModal(false)}
        onChange={handleInventarioChange1}
        onGuardar={guardarInventario}
      />

      {/* Modal de modificar inventario */}
      <ModificarInventarioModal
        isOpen={showModificarModal}
        inventarioSeleccionado={inventarioSeleccionado}
        onClose={() => setShowModificarModal(false)}
        onGuardarM={modificarInventario}
        onChange={handleInventarioChange}
      />
    </>
  );
};

export default InventarioList;
