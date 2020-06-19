import React, { useState } from 'react';


function useFormik({
  initialValues
}) {  
  const [values, setValues] = useState(initialValues); 

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    const value = event.target.value;
    setValues({
      ...values,
      [fieldName]: value,
    })
  }

  return {
    values,
    handleChange
  }
}

function App() {
  const formik = useFormik({
    initialValues: {
      userEmail: 'email@email.com',
      userPassword: '123456',
    }
  });

  return (
      <form onSubmit={(event) => {
        event.preventDefault();
        console.log(formik.values);
      }}>
        <div className="formField">
          <label htmlFor="userEmail">
            E-mail:
          </label>
          <input
            type="text"
            placeholder="email@example.com"
            name="userEmail"
            id="userEmail"
            onChange={formik.handleChange}
            value={formik.values.userEmail}
          />
          {/* <span class="formField__error">This field is required</span> */}
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
            onChange={formik.handleChange}
            value={formik.values.userPassword}
          />
          {/* <span class="formField__error">This field is required</span> */}
        </div>

        <button type="submit">
          Login
        </button>
      </form>
  );
}

export default App;
