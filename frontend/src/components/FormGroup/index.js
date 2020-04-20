import React from 'react';

export const FormGroup = ({label, htmlFor, children}) => {

  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>

  )
}

export default FormGroup;