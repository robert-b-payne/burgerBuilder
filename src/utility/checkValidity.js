const checkValidity = (value, validation) => {
  if (validation.required) {
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
        default:
          return false;
      }
    }
  }
  return true;
};

export default checkValidity;
