import React from 'react'

const Check = ({label,checked,onChange}) => {
  return (
   <section style={{display:'flex',gap:'10px',}}>
    <span>
        {label}
    </span>
    <input
        type="checkbox"      
        checked={checked}
        onChange={onChange}
        />
   </section>
  )
}

export default Check