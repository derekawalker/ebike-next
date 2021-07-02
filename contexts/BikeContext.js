import { createContext, useState } from 'react';

const BikeContext = createContext([{}, () => {}]);

const BikeProvider = ({ children }) => {
  const [state, setState] = useState({ bikes: [] });
  return (
    <BikeContext.Provider value={[state, setState]}>
      {children}
    </BikeContext.Provider>
  );
};

export { BikeContext, BikeProvider };
