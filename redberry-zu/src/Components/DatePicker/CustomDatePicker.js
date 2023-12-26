import React, { forwardRef, useState } from "react";
import { ReactComponent as CALENDAR } from "../../Image_SVG_Resources/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"; // Custom styles
import "../InputField/InputField.css";

const CostumCalendar = forwardRef(
  ({ value, onClick, focused, isError }, ref) => {
    return (
      <div
        className={`${
          value
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

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [focused, setFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const checkDate = (date) => {
    if (date === undefined || date === null) {
      return false;
    }
    const today = new Date();
    const publishDate = new Date(date);
    return publishDate > today.setDate(today.getDate() - 1);
  };

  return (
    <div className="date-picker-container">
      <label className="input-label">გამოქვეყნების თარიღი *</label>

      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="შეიყვანეთ თარიღი"
        customInput={<CostumCalendar focused={focused} isError={isError} />}
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
