import React from 'react'

function CustomButton({
    type="button",
    label="",
    classname="",
    onClick,
    ...props
}) {
  return (

    <>
        <button
        type={type}
        className={`${classname}`}
        {...props}
        onClick={onClick}
        >{label}</button>
    </>
  )
}

export default CustomButton;
