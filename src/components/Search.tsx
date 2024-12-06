//search
import {
  IonSearchbar,IonList,IonItem,IonLabel,
  IonModal,IonButton,IonSpinner,IonBadge,IonIcon
} from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { addToCart } from '../store/CarritoStore'; 
import { cartOutline } from 'ionicons/icons';
import { any } from 'cypress/types/bluebird';


interface Producto {
  id: number;
  nombre_comercial: string;
  presentacion: string;
  precio_venta: number;
  condicion_venta: string;
  procedencia: string;
  quantity: number;
}

interface InventarioItem {
  id: number;
  precio_venta: number;
  stock: number;
  lote: string;
  producto: Producto;
  quantity: number;
}



export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState<InventarioItem[]>([]);
  const [filteredResults, setFilteredResults] = useState<InventarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


 


  // Obtener inventario de la API
  useEffect(() => {
    axios
      .get<InventarioItem[]>('http://localhost:8000/api/inventario/')
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener el inventario:', error);
        setLoading(false);
      });
  }, []);

  // Función para manejar la búsqueda con debounce (Ajustar a 500ms)
  const handleSearchDebounced = debounce((term: string) => {
    if (term.length >= 3) {
      const results = inventory.filter((item) =>
        item.producto.nombre_comercial.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredResults(results);
      setIsModalOpen(true); // Abrir modal cuando haya búsqueda válida
    } else {
      setFilteredResults([]); // Limpiar resultados
      setIsModalOpen(false); // Cerrar modal si no hay suficientes caracteres
    }
  }, 1500); // Retraso de 500ms en lugar de 300ms

  // Manejar cambio de texto en el Searchbar
  const handleSearch = (event: CustomEvent<{ value: string }>) => {
    const term = event.detail.value || '';
    setSearchTerm(term);
    handleSearchDebounced(term);
  };

  // Cerrar el modal al presionar Escape o hacer clic fuera
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  if (loading) {
    return <IonSpinner name="crescent" />;
  }

  // Función para manejar la acción del botón (puedes adaptarla según sea necesario)
  const handleAddToCart = (item: InventarioItem) => {
    console.log('Agregar al carrito:', item);
    const productToAdd = {
      id: item.producto.id, // Usar 'item' en lugar de 'producto'
      title: item.producto.nombre_comercial, // 'producto' es una propiedad dentro de 'item'
      price: item.precio_venta, // 'precio_venta' está directamente en 'item'
      stock: item.stock, // 'stock' está en 'item'
      quantity: item.quantity
      
    };
    addToCart(productToAdd); // Agrega el producto al carrito
  };

  return (
    <>
      <IonSearchbar
        placeholder="Buscar Medicamentos..."
        value={searchTerm}
        onIonInput={(e) => handleSearch(e as CustomEvent<{ value: string }>)}
      />

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        
        {/* Mini buscador dentro del modal */}
        <IonSearchbar
          placeholder="Buscar en los resultados..."
          value={searchTerm}
          onIonInput={(e) => handleSearch(e as CustomEvent<{ value: string }>)}
        />

        {/* Contenedor con scroll */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <IonList>
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
              <IonItem key={item.id}>
                <IonLabel>
                  <h2>{item.producto.nombre_comercial}</h2>
                  <p>Presentación: {item.producto.presentacion}</p>
                  <p>Precio: {item.precio_venta} Gs</p>
                  <p>Stock: {item.stock}</p>
                  {/* Badge para indicar stock bajo */}
                  {item.stock && item.stock < 10 && ( /// STOCK BAJO INDICADOR///////
                    <IonBadge color="warning" >
                      Stock bajo
                    </IonBadge>
                  )}
                </IonLabel>
                {/* Botón para agregar al carrito */}
                <IonButton onClick={() => handleAddToCart(item)}>Agregar
                 <IonIcon icon={cartOutline} className="boton" />
                </IonButton>
              </IonItem>
              ))
            ) : (
              <IonItem>
                <IonLabel>No se encontraron resultados.</IonLabel>
              </IonItem>
            )}
          </IonList>
        </div>

        <IonButton onClick={() => setIsModalOpen(false)}>Cerrar</IonButton>
      </IonModal>
    </>
  );
};
