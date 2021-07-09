import { createContext, useContext, useState } from 'react';

const BikeSort = createContext([[], () => {}]);

export const BikeSortWrapper = ({ children }) => {
  const [bikeSortState, setBikeSortState] = useState({
    field: 'price',
    type: 'string',
    direction: 'asc',
  });

  return (
    <BikeSort.Provider value={[bikeSortState, setBikeSortState]}>
      {children}
    </BikeSort.Provider>
  );
};

export const useBikeSortContext = () => useContext(BikeSort);
