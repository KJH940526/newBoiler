import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { loginUser } from "../../../_actions/user_action";

import { withRouter } from "react-router-dom";
//props.history withrouter를 이용한다.

function RegisterPage(props) {
  //redux를 사용하기 위한 dispatch
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };
    dispatch(registerUser(body)).then((response) => {
      console.log("client 리스폰 ", response);
      console.log("clinet props", props);
      if (response.payload.success) {
        dispatch(loginUser(body)).then((response) => {
          console.log("client 리스폰 로그인 ", response);
          console.log("clinet props 로그인", props);
          console.log("페이로드로드로드", response.payload.loginSuccess);
          if (response.payload.loginSuccess) {
            props.history.push("/notconfirmation");
          } else {
            alert("회원가입에 실패하였습니다.");
          }
        });
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>PassWord</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm PassWord</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
