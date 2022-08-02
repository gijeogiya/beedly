import axios from "axios";

const LOGIN = "user/LOGIN";

export const login = (code) => ({
  type: LOGIN,
  code,
});

const initialState = {
  user: {
    inLogin: false,
    data: null,
  },
};

const a = function (dispatch, getState, { history }) {
  axios
    .get(`http://localhost:8080/user/login?code=${code}`)
    .then((res) => {
      console.log(res); // 토큰이 넘어올 것임

      const ACCESS_TOKEN = res.data.accessToken;

      localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

      history.replace("/main"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    })
    .catch((err) => {
      console.log("check");
    });
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log("hi");
      return function (dispatch, getState, { history }) {
        axios
          .get(`http://localhost:8080/user/login?code=${code}`)
          .then((res) => {
            console.log(res); // 토큰이 넘어올 것임

            const ACCESS_TOKEN = res.data.accessToken;

            localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

            history.replace("/main"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
          })
          .catch((err) => {
            console.log("check");
          });
      };

    default:
      return null;
  }
}
