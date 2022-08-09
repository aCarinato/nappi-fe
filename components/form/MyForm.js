import React from 'react';
// own components
import BtnCTA from '../UI/BtnCTA';

function MyForm(props) {
  const { formFields, labelCTA, formSubmit, error } = props;

  return (
    <form onSubmit={formSubmit}>
      {formFields.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.id}>{field.label}</label>
          <input
            id={field.id}
            type={field.inputType}
            ref={field.ref}
            defaultValue={field.defaultValue}
            required
          />
        </div>
      ))}
      {error && <div>{error}</div>}
      <div>
        <BtnCTA type="submit" label={labelCTA} />
      </div>
    </form>
  );
}

export default MyForm;
