import React, { useState, useEffect } from 'react';
import './App.css';

const calculatePasswordStrength = (passwordLength) => {
  if (passwordLength <= 5) {
    return 'Débil';
  } else if (passwordLength <= 10) {
    return 'Media';
  } else {
    return 'Fuerte';
  }
};

const generatePassword = (length, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars) => {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+{}[]|;:,.<>?';

  let chars = '';

  if (includeUppercase) chars += uppercaseChars;
  if (includeLowercase) chars += lowercaseChars;
  if (includeNumbers) chars += numberChars;
  if (includeSpecialChars) chars += specialChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};

const App = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(5);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('Débil');
  const [filledPercentage, setFilledPercentage] = useState(0);
  const [showSelectMessage, setShowSelectMessage] = useState(false);

  useEffect(() => {
    const strength = calculatePasswordStrength(password.length);
    setPasswordStrength(strength);

    let percentage = 0;
    if (strength === 'Media') {
      percentage = 50;
    } else if (strength === 'Fuerte') {
      percentage = 100;
    }
    setFilledPercentage(percentage);
  }, [password]);

  const handleGeneratePassword = () => {
    if (!(includeUppercase || includeLowercase || includeNumbers || includeSpecialChars)) {
      setShowSelectMessage(true);
      setPassword('');
      return;
    }
    
    const newPassword = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars);
    setPassword(newPassword);
    setShowSelectMessage(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Contraseña copiada al portapapeles');
  };

  const handleLengthChange = (e) => {
    const newLength = parseInt(e.target.value, 10);
    setLength(newLength);
    if (isNaN(newLength)) {
      return;
    }
    setPasswordStrength(calculatePasswordStrength(newLength));
  };
  
  const handleCheckboxChange = () => {
    setShowSelectMessage(false); 

   
    if (!(includeUppercase || includeLowercase || includeNumbers || includeSpecialChars)) {
      setPassword('');
    }
  };

  return (
    <div className="App">
      <h1>Generador de Contraseñas</h1>

      <div>
        <label>Longitud de la Contraseña:</label>
        <input type="number" value={length} onChange={handleLengthChange} />
      </div>

      <div>
        <label>Incluir Mayúsculas:</label>
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={() => {
            setIncludeUppercase(!includeUppercase);
            handleCheckboxChange();
          }}
        />
      </div>

      <div>
        <label>Incluir Minúsculas:</label>
        <input
          type="checkbox"
          checked={includeLowercase}
          onChange={() => {
            setIncludeLowercase(!includeLowercase);
            handleCheckboxChange();
          }}
        />
      </div>

      <div>
        <label>Incluir Números:</label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => {
            setIncludeNumbers(!includeNumbers);
            handleCheckboxChange();
          }}
        />
      </div>

      <div>
        <label>Incluir Caracteres Especiales:</label>
        <input
          type="checkbox"
          checked={includeSpecialChars}
          onChange={() => {
            setIncludeSpecialChars(!includeSpecialChars);
            handleCheckboxChange();
          }}
        />
      </div>

      {showSelectMessage && <p>Debes seleccionar al menos una casilla.</p>}

      <button onClick={handleGeneratePassword}>Generar Contraseña</button>

      {password && (
        <div style={{
          display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
        }}>
          <h2>Contraseña Generada:</h2>
          <p style={{
                maxWidth: '250px',
                overflow: 'hidden',
                display: 'flex',
                textOverflow: 'ellipsis',
                textAlign: 'center',
          }}>{password}</p>
          <button onClick={handleCopyToClipboard}>Copiar al Portapapeles</button>
        </div>
      )}

      <div>
        <h3>Seguridad de la Contraseña: {passwordStrength}</h3>
        <div className="password-strength-bar">
          <div
            className={`password-strength-filled ${passwordStrength.toLowerCase()}`}
            style={{ width: `${filledPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;




