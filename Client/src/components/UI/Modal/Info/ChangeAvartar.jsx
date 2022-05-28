import React, { useState } from 'react'

export default function ChangeAvartar(props) {
  const readbase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      props.setImageFile({ file: reader.result, ofile: file[0] })
    }
  }
  return (
    <>
      <label htmlFor="avartar">
        <a style={{
        color: '#080808',
        fontSize: '13px',
        fontWeight: 'bold',
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100px',
        height: '35px',
        backgroundColor: '#c2e0e4',
        marginTop:20,
        borderRadius: '5px',
        boxShadow: '0px 0px 5px #000000',
      }}>Change Image</a>
      </label>
      <input type="file" style={{ display: 'none' }} id="avartar" accept='image/*' onChange={(e) => readbase64(e.target.files)} />
    </>
  )
}
