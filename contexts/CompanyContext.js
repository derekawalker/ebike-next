import { createContext, useState } from 'react';

const CompanyContext = createContext([{}, () => {}]);

const BikeProvider = ({ children }) => {
  const [state, setState] = useState({ bikes: [] });
  return (
    <CompanyContext.Provider value={[state, setState]}>
      {children}
    </CompanyContext.Provider>
  );
};

export { CompanyContext, BikeProvider };
