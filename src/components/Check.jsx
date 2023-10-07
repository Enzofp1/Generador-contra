import React, { useState } from 'react'

const Check = ({label,checked,onChange,className}) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
   <section className={className} style={{display:'flex',gap:'10px',}}>
    <span onClick={() => {
          setIsChecked(!isChecked);
          onChange();
        }}>

        {label}
    </span>
    <input
        type="checkbox"      
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          onChange();
        }}
        />
   </section>
  )
}

export default Check