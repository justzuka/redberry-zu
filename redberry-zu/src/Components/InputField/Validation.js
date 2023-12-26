import React, { useEffect, useState } from "react";
import "./Validation.css";

const Validation = ({
  text,
  isDefaultParent,
  validate,
  change,
  value,
  setErrorParent,
}) => {
  const [isDefault, setIsDefault] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsDefault(isDefaultParent);
  }, [isDefaultParent]);

  useEffect(() => {
    const ans = !validate(value);
    setIsError(ans);
    setErrorParent(ans);
  }, [change]);

  return (
    <div
      className={`validation ${
        isDefault ? "" : isError ? "validation-error" : "validation-correct"
      }`}
    >
      • {text}
    </div>
  );
};

export default Validation;
