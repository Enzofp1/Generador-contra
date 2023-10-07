import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import Check from './components/Check';
import generatePassword from './utils/generatePassword';
import calculatePasswordStrength from './utils/calculatePassword';




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
  const INPUTS= [{
    onChange: () => {
             setIncludeUppercase(!includeUppercase);
             handleCheckboxChange();
           },
     label: 'Incluir Mayúsculas',
     checked: includeUppercase,
   },
   {
     onChange: () => {
             setIncludeLowercase(!includeLowercase);
             handleCheckboxChange();
           },
     label: 'Incluir Minúsculas',
     checked: includeLowercase,
   },
   {
     onChange: () => {
             setIncludeNumbers(!includeNumbers);
             handleCheckboxChange();
           },
     label: 'Incluir Números',
     checked: includeNumbers,
   },
   {
     onChange: () => {
             setIncludeSpecialChars(!includeSpecialChars);
             handleCheckboxChange();
           },
     label: 'Incluir Caracteres Especiales',
     checked: includeSpecialChars,
   },];
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
    const newLength = parseInt(e.target.value,10);
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
      <h1 className='aa'>Generador de Contraseñas</h1>

      <div>
        <label>Longitud de la Contraseña:
        <input type="number" value={length} onChange={handleLengthChange} />
        </label>
        
      </div>
     {
        INPUTS.map((check,i) => (
          <Check {...check}key={i}/>
        ))
     }

      {showSelectMessage && <p>Debes seleccionar al menos una casilla.</p>}

      <Button onClick={handleGeneratePassword}>Generar Contraseña</Button>

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
                backgroundColor: 'rgb(255 255 255 / 36%)',
                borderRadius: '5px',
                padding: '5px',
          }}>{password}</p>
          <Button onClick={handleCopyToClipboard}>Copiar al Portapapeles</Button>
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




