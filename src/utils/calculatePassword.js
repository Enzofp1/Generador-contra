const calculatePasswordStrength = (passwordLength) => {
    if (passwordLength <= 5) {
      return 'Débil';
    } else if (passwordLength <= 11) {
      return 'Media';
    } else {
      return 'Fuerte';
    }
  };
  export default calculatePasswordStrength;