import React from 'react'
import axios from 'axios'
export default function User() {
    return (
        <div>User</div>
    )
}

export function kakaoLogin(code) {
    return function (dispatch, getState, { history }) {
        axios({
            method: "GET",
            url: `http://localhost:8080/user/login?code=${code}`
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    }
}

