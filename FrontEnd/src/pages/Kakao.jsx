import React from 'react'
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../stores/modules/User";
import Login from "./Login";

export default function Kakao() {
    const dispatch = useDispatch();
    let code = new URL(window.location.href).searchParams.get("code");

    React.useEffect(async () => {
        await dispatch(kakaoLogin(code));
    }, []);
    console.log(code)
    return (
        <Login />
    )
}


