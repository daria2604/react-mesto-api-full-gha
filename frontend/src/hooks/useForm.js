import React from "react";

function useForm(inputValues = {}) {
  const [values, setValues] = React.useState(inputValues);
  const [isValid, setIsValid] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest("form").checkValidity());
  };

  return {
    values,
    errors,
    handleChange,
    setValues,
    setErrors,
    setIsValid,
    isValid,
  };
}

export default useForm;
