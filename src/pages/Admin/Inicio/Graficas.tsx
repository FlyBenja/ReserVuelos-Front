import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import React from 'react';

const Graficas: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Graficas" /> {/* Agregar el Breadcrumb */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      </div>
    </>
  );
};

export default Graficas;
