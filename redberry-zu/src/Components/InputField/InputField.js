import React, { useEffect, useState } from "react";
import "./InputField.css";
import Validation from "./Validation";

const InputField = ({ placeholder, labe_text, validations, isTextArea }) => {
  const [isDefault, setIsDefault] = useState(true);
  const [value, setValue] = useState("");
  const [change, setChange] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    if (isDefault) {
      setIsDefault(false);
    }
    setValue(e.target.value);
    setChange(!change);
  };

  useEffect(() => {
    setErrors(validations.map((v) => false));
  }, []);

  const setErrorIndex = (index, v) => {
    setErrors((prevErrors) => {
      let newArr = [...prevErrors];
      newArr[index] = v;
      return newArr;
    });
  };

  return (
    <div className={`input-field-container ${isTextArea ? 'is-text-area' : ''}`}>
      <label className="input-label">{labe_text}</label>
      {isTextArea ? (
        <textarea
          className={`${
            isDefault
              ? "input-field"
              : errors.filter((e) => e).length === 0
              ? "input-field-correct"
              : "input-field-error"
          } is-text-area`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${
            isDefault
              ? "input-field"
              : errors.filter((e) => e).length === 0
              ? "input-field-correct"
              : "input-field-error"
          }`}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}

      {validations.map((validation, index) => {
        return (
          <Validation
            key={index}
            text={validation.text}
            isDefaultParent={isDefault}
            validate={validation.validate}
            value={value}
            change={change}
            setErrorParent={(v) => setErrorIndex(index, v)}
          />
        );
      })}
    </div>
  );
};

export default InputField;
