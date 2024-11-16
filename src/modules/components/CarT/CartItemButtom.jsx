import React from 'react'

export const CartItemButtom = ({value,text}) => {
  return (
    <button
      style={{
        backgroundColor: 'white',
        borderRadius: '2px',
        width: '1.25rem',
        height: '1.5rem',
        color: '#0e7490',
      }}
      onClick={value}
    >
      {text}
    </button>
  )
}
