import React, { useState } from 'react'

const Check = ({label,checked,onChange}) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
   <section style={{display:'flex',gap:'10px',}}>
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