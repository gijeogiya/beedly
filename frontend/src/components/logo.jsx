import React from 'react'

const logostyle = {
    maxHeight : "6vh",
    backgroundColor : "#1F1D1D",
    display : "flex",
    justifyContent : "center",
}

const logoimg = {
    maxHeight : "5.9vh",
    backgroundColor : "#1F1D1D",
}

export default function logo() {
    return (
        <div style = {logostyle}>           
            <img style={logoimg} alt="logo" src="img/logo.png" />
        </div>
        
    )
}
