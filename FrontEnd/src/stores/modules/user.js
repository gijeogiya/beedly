import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import "react-router-dom";
import produce from "immer";
const LOGIN = "user/LOGIN";
const SET_USER = "SET_USER";
const setUser = createAction(SET_USER, (user) => ({ user }));
const initialState = {
  user: null,
};

export const login = (code) => {
  return function (dispatch, getState) {
    axios
      .post(`http://i7a601.p.ssafy.io:8080/api/user/login?code=${code}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("로그인 성공");
          let token = res.headers["authorization"];
          localStorage.setItem("token", res.data.token);
          window.location.replace("/");
        } else if (res.status === 201) {
          //사용자 정보가 없을 때(회원가입 안함)
          window.location.replace("/signup1");
        }
        dispatch(
          setUser({
            username: res.data.username,
            nickname: res.data.nickname,
            token: token,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log(2);
        draft.user = action.payload.user;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  login,
};
export { actionCreators };
