import React from "react";
import { ErrorMessage, useField } from "formik";

import "./cmnStyle.css";

export const DropDown = ({
  label,
  defValue,
  isRequired,
  data = [],
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2">
      <label htmlFor={field.name} className="label-inpt">
        {label}
        {isRequired && <span className="astrk">*</span>}
      </label>
      <select
        className={`form-control shadow-none  inpt-txt-size`}
        {...field}
        {...props}
        autoComplete="off"
      >
        <option value="">{defValue}</option>
        {data.length &&
          data.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.code}
              </option>
            );
          })}
      </select>
      {meta.error ? (
        <ErrorMessage component="div" name={field.name} className="errStyle" />
      ) : null}
    </div>
  );
};
