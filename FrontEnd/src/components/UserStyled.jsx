import React from 'react'
import "../App.css";
import styled, { css } from 'styled-components';

//InputBox Styled Component
const InputStyle = styled.input`
    font-weight: bold;
    font-family: "Noto Sans KR", sans-serif;
    width: 65vw;
    height: 40px;
    box-shadow: 0px 4px 3px 0px rgba(0,0,0,0.6);
    border-radius: 5px;
    border: 1px rgb(255,255,255);
    padding: 5px 15px;
    margin: 5px 0px;
    color: black;
`;

export function Input({ children }) {
    return <InputStyle type="text" placeholder={children} />;
}

//hr 밑줄 Styled Component
const HrStyled = styled.hr`
    background-color: #1F1D1D;
    opacity: 40%;

    ${(props) =>
        props.Thin &&
        css`
        height: 1px;
        width: 80vw;
    `}

    ${(props) =>
        props.ThinFull &&
        css`
        height: 1px;
        width: 100vw;
    `}

    ${(props) =>
        props.Thick &&
        css`
        height: 2px;
        width: 80vw;
    `}

    ${(props) =>
        props.ThickFull &&
        css`
        height: 2px;
        width: 100vw;
        `}
        `;

export function Hr({ ...props }) {
    return <HrStyled {...props} />;
}

const StyledDiv = styled.div`
    display: flex;
    
    ${(props) =>
        props.Column_SB &&
        css`
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        `}
        
    ${(props) =>
        props.Column_SA &&
        css`
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    `}

    ${(props) =>
        props.Row_SB &&
        css`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `}

    ${(props) =>
        props.Row_SA &&
        css`
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    `}

    ${(props) =>
        props.MainContent &&
        css`
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 90vh;
    `}
        `;

export function FlexBox({ children }, { ...props }) {
    return <StyledDiv {...props}> {children} </StyledDiv>;
}