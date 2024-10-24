import { ReactNode } from 'react';
import '../theme/ExploreContainer.css';

interface ContainerProps {
  contenido?: ReactNode
}


const ExploreContainer: React.FC<ContainerProps> = (parametro ) => {
  return (
    <div className="container">
      {
        parametro.contenido
      }
      
    </div>
  );
};

export default ExploreContainer;
