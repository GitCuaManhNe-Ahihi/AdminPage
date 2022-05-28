import React from 'react'
import classes from './Input.module.scss'


const Input=(props,ref) =>{
  return (
    <input   {...props} autoComplete='off'>
    </input>
  )
}
export default React.forwardRef(Input)