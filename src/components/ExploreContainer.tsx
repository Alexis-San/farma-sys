import { useState } from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
  algo: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name, algo }) => {
  
  return (
    <div className="container">
      <strong>{name + algo}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
