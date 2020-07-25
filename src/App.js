/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

function useFormik({
  initialValues,
  validate
}) {
  const [touched, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    console.log('Alguém mexeu nos values', values);
    validateValues(values);
  }, [values]);

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    const { value } = event.target;
    setValues({
      ...values,
      [fieldName]: value,
    });
  }

  function handleBlur(event) {
    const fieldName = event.target.getAttribute('name');
    console.log(fieldName);
    setTouchedFields({
      ...touched,
      [fieldName]: true,
    })
  }

  function validateValues(values) {
    setErrors(validate(values));
  }

  return {
    values,
    errors,
    touched,
    handleBlur,
    setErrors,
    handleChange,
  };
}

function App() {
  const formik = useFormik({
    initialValues: {
      userEmail: 'email email.com',
      userPassword: '123456',
    },
    validate: function (values) {
      const errors = {};
    
      if(!values.userEmail.includes('@')) {
        errors.userEmail = 'Please, insert a valid email';
      }
    
      if(values.userPassword.length < 8) {
        errors.userPassword = 'Please, insert a valid password'
      }
    
      return errors;
    }
  });

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      console.log(formik.values);

      // validateValues(formik.values)

      alert('Olha o console!');
    }}
    >
      <div className="formField">
        <label htmlFor="userEmail">
          E-mail:
        </label>
        <input
          type="text"
          placeholder="email@example.com"
          name="userEmail"
          id="userEmail"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.userEmail}
        />
        {formik.touched.userEmail && formik.errors.userEmail && <span className="formField__error">{formik.errors.userEmail}</span>}
      </div>

      <div className="formField">
        <label htmlFor="userPassword">
          Password:
        </label>
        <input
          type="password"
          placeholder="Your secret password"
          name="userPassword"
          id="userPassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.userPassword}
        />
        {formik.touched.userPassword && formik.errors.userPassword && <span className="formField__error">{formik.errors.userPassword}</span>}
      </div>

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default App;
