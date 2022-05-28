import React from 'react'
import classes from './Card.module.scss'
export default function CardContainer(props) {
  return (
    <div className={classes.container}> 
        {props.children}
    </div>
  )
}
