const calculatePasswordStrength = (passwordLength) => {
    if (passwordLength <= 5) {
      return 'Débil';
    } else if (passwordLength <= 8) {
      return 'Media';
    } else {
      return 'Fuerte';
    }
  };
  export default calculatePasswordStrength;