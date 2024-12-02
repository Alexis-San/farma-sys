import {
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonModal,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

interface Producto {
  id: number;
  nombre_comercial: string;
  presentacion: string;
  precio_venta: number;
  condicion_venta: string;
  procedencia: string;
}

interface InventarioItem {
  id: number;
  precio_venta: number;
  stock: number;
  lote: string;
  producto: Producto;
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
        setFilteredResults(response.data); // Inicialmente muestra todo el inventario
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener el inventario:', error);
        setLoading(false);
      });
  }, []);

  // Función para manejar la búsqueda con debounce
  const handleSearchDebounced = debounce((term: string) => {
    const results = inventory.filter((item) =>
      item.producto.nombre_comercial.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredResults(results);
  }, 300);

  // Manejar cambio de texto en el Searchbar
  const handleSearch = (event: CustomEvent<{ value: string }>) => {
    const term = event.detail.value || '';
    setSearchTerm(term);
    handleSearchDebounced(term);
  };

  if (loading) {
    return <IonSpinner name="crescent" />;
  }

  return (
    <>
      <IonSearchbar
        placeholder="Buscar Medicamentos..."
        value={searchTerm}
        onIonInput={(e) => handleSearch(e as CustomEvent<{ value: string }>)}
        onFocus={() => setIsModalOpen(true)} // Abrir el modal al enfocar el buscador
      />

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonButton onClick={() => setIsModalOpen(false)}>Cerrar</IonButton>
        <IonList>
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <IonItem key={item.id}>
                <IonLabel>
                  <h2>{item.producto.nombre_comercial}</h2>
                  <p>Presentación: {item.producto.presentacion}</p>
                  <p>Precio: {item.precio_venta} Gs</p>
                  <p>Stock: {item.stock}</p>
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>No se encontraron resultados.</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonModal>
    </>
  );
};
