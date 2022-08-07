import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { LogoHeader } from '../components/Common';
import { actionCreators as userActions } from "../stores/modules/user";
// import { login } from '../utils/api';
import Loading from "./Loading";
import { useSelector } from 'react-redux';
export default function Kakao() {
    const dispatch = useDispatch();
    const [userId, setuserId] = useState('');
    const Selector = useSelector(state => state.user.user);
    React.useEffect(() => {
        let code = new URL(window.location.href).searchParams.get("code");
        async function fetchData() {
            await dispatch(userActions.login(code));
        }
        fetchData();

    }, []);
    return (
        <div>
            <LogoHeader />
            <div>
                {Selector.userId}

            </div>
            <Loading />
        </div>
    )
}
