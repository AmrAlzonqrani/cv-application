import { useState } from "react";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function FormControl({ label, type, id, value, required = false }) {
  const [inputValue, setInputValue] = useState(value);

  if(type === 'textarea') {
    return (
      <div className="form-control">
        <label htmlFor={id}>
          {capitalizeFirstLetter(label)}:
        </label>
        <textarea
          id={id}
          name={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
      </div>
    )
  }

  return (
    <div className="form-control">
      <label htmlFor={id}>
        {capitalizeFirstLetter(label)}:
        {required && <span className="asterisk">*</span>}
      </label>
      {required ? (
        <input
          type={type}
          id={id}
          name={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
    </div>
  );
}

export default function GeneralSection({ className, index, values }) {
  const valuesExist = values && values !== null;

  return (
    <section className={className} data-section-index={index}>
      <h2>General information</h2>
      <FormControl
        label="name"
        type="text"
        id="name"
        required={true}
        value={valuesExist ? values.name : ""}
      />
      <FormControl
        label="email"
        type="email"
        id="email"
        value={valuesExist ? values.email : ""}
      />
      <FormControl
        label="phone number"
        type="tel"
        id="phone"
        value={valuesExist ? values.phone : ""}
      />
      <FormControl
        label="profile"
        type="textarea"
        id="profile"
        value={valuesExist ? values.profile : ""}
      />
    </section>
  );
}
