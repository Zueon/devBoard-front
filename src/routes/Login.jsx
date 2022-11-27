import axios, { formToJSON } from "axios";
import React from "react";

const Login = () => {
  async function submitHandler(e) {
    e.preventDefault();
    console.log("click submit");

    const form = new FormData(e.target);

    const data = formToJSON(form);
    console.log(data);

    const response = await axios({
      method: "get",
      url: "http://localhost:8080/member/login",
      params: data,
    });

    console.log(response);
  }

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={submitHandler}>
        <h1 className="h3 mb-3 font-weight-normal">로그인 하세요</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          name="email"
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <br />
        <a href="/signup">회원가입</a>
      </form>
    </div>
  );
};

export default Login;
