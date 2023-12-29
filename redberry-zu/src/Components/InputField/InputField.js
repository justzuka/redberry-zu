import React, { useEffect, useState } from "react";
import "./InputField.css";
import Validation from "./Validation";

const InputField = ({
  placeholder,
  labe_text,
  validations,
  isTextArea,
  setValueParent,
  setErrorParent,
  breakDefault,
}) => {
  const [isDefault, setIsDefault] = useState(true);
  const [value, setValue] = useState("");
  const [change, setChange] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    if (isDefault) {
      setIsDefault(false);
    }
    setValue(e.target.value);

    localStorage.setItem(labe_text + placeholder, e.target.value);

    if (setValueParent !== undefined) {
      setValueParent(e.target.value);
    }
    setChange(!change);
  };

  useEffect(() => {
    const storedString = localStorage.getItem(labe_text + placeholder);
    if (storedString) {
      handleChange({ target: { value: storedString } });
    }
  }, []);

  useEffect(() => {
    if (breakDefault && isDefault) {
      handleChange({ target: { value: value } });
    }
  }, [breakDefault]);

  useEffect(() => {
    setErrors(validations.map((v) => false));
  }, []);

  useEffect(() => {
    if (setErrorParent !== undefined) {
      setErrorParent(!(errors.filter((e) => e).length === 0));
    }
  }, [errors]);

  const setErrorIndex = (index, v) => {
    setErrors((prevErrors) => {
      let newArr = [...prevErrors];
      newArr[index] = v;
      return newArr;
    });
  };

  return (
    <div
      className={`input-field-container ${isTextArea ? "is-text-area" : ""}`}
    >
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
