import { createContext, useContext, useState } from 'react';

const BikeFilters = createContext([[], () => {}]);

export const BikeFiltersWrapper = ({ children }) => {
  const [bikeFiltersState, setBikeFiltersState] = useState({
    min_price: '0',
    max_price: '0',
    motor: '0',
    battery: '0',
    range: '0',
    top_speed: '0',
    voltage: '0',
    suspension: '0',
    manufacturer: '0',
    motor_type: '0',
  });

  return (
    <BikeFilters.Provider value={[bikeFiltersState, setBikeFiltersState]}>
      {children}
    </BikeFilters.Provider>
  );
};

export const useBikeFiltersContext = () => useContext(BikeFilters);
