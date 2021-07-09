import { createContext, useContext, useState } from 'react';

const BikeContext = createContext([[], () => {}]);

export const BikeWrapper = ({ children }) => {
  const [bikesState, setBikesState] = useState([]);

  return (
    <BikeContext.Provider value={[bikesState, setBikesState]}>
      {children}
    </BikeContext.Provider>
  );
};

export const useBikeContext = () => useContext(BikeContext);
