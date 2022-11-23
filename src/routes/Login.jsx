import React from "react";

const Login = () => {
  return (
    <div className="text-center">
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">로그인 하세요</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
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
