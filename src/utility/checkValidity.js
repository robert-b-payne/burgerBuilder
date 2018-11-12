const checkValidity = (value, validation, otherPassword) => {
  if (validation.required) {
    let pattern;
    for (let key in validation.rules) {
      switch (key) {
        case "minLength":
          if (value.length < validation.rules.minLength) return false;
          break;
        case "maxLength":
          if (value.length > validation.rules.maxLength) return false;
          break;
        case "length":
          if (value.length !== validation.rules.length) return false;
          break;
        case "isEmail":
          pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          return pattern.test(value);
        case "isNumeric":
          pattern = /^\d+$/;
          return pattern.test(value);

        case "confirmPassword":
          return value === otherPassword;
        case "isPhoneNumber":
          pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
          let pattern2 = /^\d+$/;
          return (
            pattern.test(value) || (value.length === 10 && pattern2.test(value))
          );

        default:
          return false;
      }
    }
  }
  return true;
};

export default checkValidity;
