import React, { forwardRef, useEffect, useState } from "react";
import { ReactComponent as CALENDAR } from "../../Image_SVG_Resources/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"; // Custom styles
import "../InputField/InputField.css";

const CostumCalendar = forwardRef(
  ({ value, onClick, focused, isError, breakDefault }, ref) => {
    return (
      <div
        className={`${
          value
            ? isError
              ? "input-field-error"
              : "input-field-correct"
            : breakDefault
            ? isError
              ? "input-field-error"
              : "input-field-correct"
            : focused
            ? "input-field-focused"
            : "input-field"
        } date-picker-field`}
        onClick={onClick}
        ref={ref}
      >
        {value ? <CALENDAR className="calendar-icon" /> : ""}
        <div className={`calendar-text ${value ? "" : "placeholder-text"}`}>
          {value ? value : "აირჩიეთ თარიღი"}
        </div>
      </div>
    );
  }
);

const DatePickerComponent = ({
  setValueParent,
  setErrorParent,
  breakDefault,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [focused, setFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [doOnce, setDoOnce] = useState(true);

  const handleChange = (date) => {
    setDoOnce(false);
    setSelectedDate(date);
    localStorage.setItem("datepicker", JSON.stringify(date));
    if (setValueParent !== undefined) {
      setValueParent(date);
    }
  };

  useEffect(() => {
    const storedString = JSON.parse(localStorage.getItem("datepicker"));
    if (storedString) {
      handleChange(new Date(storedString));
      setIsError(!checkDate(new Date(storedString)));
    }
  }, []);

  useEffect(() => {
    if (breakDefault && doOnce) {
      setIsError(true);
      setDoOnce(false);
    }
  }, [breakDefault]);

  const checkDate = (date) => {
    if (date === undefined || date === null) {
      return false;
    }
    const today = new Date();
    const publishDate = new Date(date);
    return publishDate > today.setDate(today.getDate() - 1);
  };

  useEffect(() => {
    if (setErrorParent !== undefined) {
      setErrorParent(isError);
      
    }
  }, [isError]);

  return (
    <div className="date-picker-container">
      <label className="input-label">გამოქვეყნების თარიღი *</label>

      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="შეიყვანეთ თარიღი"
        customInput={<CostumCalendar focused={focused} isError={isError} breakDefault={breakDefault}/>}
        onCalendarOpen={() => {
          setFocused(true);
        }}
        onCalendarClose={() => {
          setFocused(false);
          setIsError(!checkDate(selectedDate));
        }}
      />
    </div>
  );
};

export default DatePickerComponent;
