const checkValidity = (value, validation) => {
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

        default:
          return false;
      }
    }
  }
  return true;
};

export default checkValidity;
