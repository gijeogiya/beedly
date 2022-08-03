import axios from "axios";
import { createAction, handleActions } from "redux-actions";
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
      .post(`http://localhost:8080/user/login?code=${code}`)
      .then((res) => {
        console.log("로그인 성공");
        let token = res.headers["authorization"];
        localStorage.setItem("token", res.data.token);
        if (res.status === 200) {
        } else if (res.status === 201) {
        }
        console.log(token);
        dispatch(
          setUser({
            username: res.data.username,
            nickname: res.data.nickname,
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
