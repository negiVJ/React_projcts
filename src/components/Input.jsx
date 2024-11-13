import React from 'react'

function Input({
    label,
    placeholder,
    type="text",
    className='',
    ...props
}, ref) {

    const id = React.useId()

  return (
    <> 
        {label && <label htmlFor={id}>{label}</label>}
        <input type={type} 
        placeholder={placeholder} 
        className={`${className}`} 
        {...props} 
        ref={ref} 
        id={id}/>
        
    </>
  )
}

export default React.forwardRef(Input);
