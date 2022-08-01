import React, { Component, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import OpenViduSession from "openvidu-react";

const App2 = () => {
  const [user, setUser] = useState({
    mySessionId: "",
    myUserName: "",
    token: undefined,
    session: undefined,
  });
  const [OPENVIDU_SERVER_URL, setOPENVIDU_SERVER_URL] = useState(
    "https://localhost:4443"
  );
  const [OPENVIDU_SERVER_SECRET, setOPENVIDU_SERVER_SECRET] =
    useState("MY_SECRET");
  useEffect(() => {
    setUser({
      mySessionId: "SessionA",
      myUserName: "OpenVidu_User_" + Math.floor(Math.random() * 100),
      token: undefined,
      session: undefined,
    });
  }, []);

  // constructor(props) {
  //     super(props);
  //     console.log(props);
  //     this.OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
  //     console.log(this.OPENVIDU_SERVER_URL);
  //     this.OPENVIDU_SERVER_SECRET = 'MY_SECRET';
  //     this.state = {
  //         mySessionId: 'SessionA',
  //         myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
  //         token: undefined,
  //     };

  //     this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
  //     this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
  //     this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
  //     this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
  //     this.handleChangeUserName = this.handleChangeUserName.bind(this);
  //     this.joinSession = this.joinSession.bind(this);
  // }

  const changeValue = (key, value) => {
    setUser((prevState) => {
      let temp = { ...prevState };
      temp[key] = value;
      return temp;
    });
  };

  function handlerJoinSessionEvent() {
    console.log("Join session");
  }

  function handlerLeaveSessionEvent() {
    console.log("Leave session");
    changeValue("session", undefined);
  }

  function handlerErrorEvent() {
    console.log("Leave session");
  }

  function handleChangeSessionId(e) {
    changeValue("mySessionId", e.target.value);
  }

  function handleChangeUserName(e) {
    changeValue("myUserName", e.target.value);
  }

  function joinSession(event) {
    if (user.mySessionId && user.myUserName) {
      getToken().then((token) => {
        changeValue("token", token);
        changeValue("session", true);
      });
      event.preventDefault();
    }
  }

  return (
    <div>
      {user.session === undefined ? (
        <div id="join">
          <div id="join-dialog">
            <h1> Join a video session </h1>
            <form onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  type="text"
                  id="userName"
                  value={user.myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  type="text"
                  id="sessionId"
                  value={user.mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p>
                <input name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div id="session">
          <OpenViduSession
            id="opv-session"
            sessionName={user.mySessionId}
            user={user.myUserName}
            token={user.token}
            joinSession={handlerJoinSessionEvent}
            leaveSession={handlerLeaveSessionEvent}
            error={handlerErrorEvent}
          />
        </div>
      )}
    </div>
  );

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  function getToken() {
    return createSession(user.mySessionId)
      .then((sessionId) => createToken(sessionId))
      .catch((Err) => console.error(Err));
  }

  function createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  function createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
};
export default App2;
