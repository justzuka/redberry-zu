import React, { createContext, useContext, useState } from "react";
import { Login } from "./FetchInformation";

const FieldErrorContext = createContext();

export const useFieldErrorContext = () => useContext(FieldErrorContext);

export const FieldErrorProvider = ({ children }) => {
  const [emailHasError, setEmailHasError] = useState(false);

  const checkForEmailErrorLogin = async (email, setErrorMessage) => {
    switch (true) {
      case email === "":
        setErrorMessage("გთხოვთ შეიყვანოთ ელ-ფოსტა");
        setEmailHasError(true)
        return false;

      case !email.endsWith("@redberry.ge"):
        setErrorMessage("ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge");
        setEmailHasError(true)
        return false;

      default:
        const answer = await Login(email);
        if (!answer) {
          setErrorMessage("ელ-ფოსტა არ მოიძებნა");
          setEmailHasError(true)
        }
        else{
          setErrorMessage("");
          setEmailHasError(false)
        }
        return answer;
    }
  };

  return (
    <FieldErrorContext.Provider value={{ emailHasError, setEmailHasError, checkForEmailErrorLogin }}>
      {children}
    </FieldErrorContext.Provider>
  );
};
