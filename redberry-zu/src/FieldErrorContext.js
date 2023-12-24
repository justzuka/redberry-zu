import React, { createContext, useContext, useState } from "react";

const FieldErrorContext = createContext();

export const useFieldErrorContext = () => useContext(FieldErrorContext);

export const FieldErrorProvider = ({ children }) => {
    const [emailHasError, setEmailHasError] = useState(false)
  
  return (
    <FieldErrorContext.Provider value={{emailHasError, setEmailHasError}}>
      {children}
    </FieldErrorContext.Provider>
  );
};
