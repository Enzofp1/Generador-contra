const calculatePasswordStrength = (passwordLength) => {
    if (passwordLength <= 10) {
      return 'Débil';
    } else if (passwordLength <= 30) {
      return 'Media';
    } else {
      return 'Fuerte';
    }
  };
  export default calculatePasswordStrength;