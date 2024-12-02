import { IonSearchbar } from '@ionic/react';
import { ChangeEvent, useState } from 'react';


export const SearchBar: React.FC  = () => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (event:ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    return (
      <IonSearchbar
        placeholder="Buscar..."
        value={searchTerm}
        onChange={()=>handleSearch}
      />
    );
  };
  