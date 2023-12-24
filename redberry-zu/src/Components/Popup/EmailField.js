import React, {useState} from "react";
import "./EmailField.css";
import { useFieldErrorContext } from "../../FieldErrorContext";

const EmailField = () => {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="email-field-container">
      <label className="email-label">ელ-ფოსტა</label>
      <input
        className={`email-field`}
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Example@redberry.ge"
      />
    </div>
  );
};

export default EmailField;
