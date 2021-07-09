import { createContext, useContext, useState } from 'react';

const CompanyContext = createContext([[], () => {}]);

export const CompanyWrapper = ({ children }) => {
  const [companiesState, setCompaniesState] = useState([]);

  return (
    <CompanyContext.Provider value={[companiesState, setCompaniesState]}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => useContext(CompanyContext);
