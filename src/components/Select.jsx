import React from 'react'

function Select({
    options=[],
    label,
    name,
    className="",
    ...props
}, ref) {

    const id = React.useId();
  return (
    <div>
        {label && <label htmlFor={id}>{label}</label>}
        <select name={name} id={id} className={`${className}`} 
        {...props}
        ref={ref}>
            {options?.map((option)=>(
                <option value={option} key={option} >{option}</option>
            ))}
        </select>


    </div>
  )
}

export default React.forwardRef(Select)