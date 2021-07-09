import { createContext, useContext, useState } from 'react';

const BikeCompare = createContext([[], () => {}]);

export const BikeCompareWrapper = ({ children }) => {
  const [bikeCompareState, setBikeCompareState] = useState([]);

  return (
    <BikeCompare.Provider value={[bikeCompareState, setBikeCompareState]}>
      {children}
    </BikeCompare.Provider>
  );
};

export const useBikeCompareContext = () => useContext(BikeCompare);
