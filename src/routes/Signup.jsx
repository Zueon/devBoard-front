import React from "react";
import { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    pwConfirm: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  return (
    <div className="container mb-3">
      <form className="border border-light p-5" action="#!">
        <p className="h4 mb-4">회원가입</p>

        <div className="form-row mb-4">
          <div className="col">
            <label htmlFor="username">이름</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={form.username}
              onChange={(e) => {
                updateForm({ username: e.target.value });
              }}
            />
          </div>
        </div>

        <label htmlFor="nickname">닉네임</label>

        <input
          className="form-control mb-4"
          type="text"
          name="nickname"
          id="nickname"
        />

        <label htmlFor="email">이메일</label>

        <input
          className="form-control mb-4"
          type="email"
          name="email"
          id="email"
        />

        <div className="form-row mb-4">
          <div className="col">
            <label htmlFor="password">패스워드</label>
            <input
              type="password"
              className="form-control mb-4"
              id="password"
              name="password"
            />
          </div>
          <div className="col">
            <label htmlFor="pwConfirm">패스워드 확인</label>
            <input
              type="password"
              className="form-control mb-4"
              id="pwConfirm"
              name="pwConfirm"
            />
          </div>
        </div>

        <label> 주소 </label>
        <div className="form-row mb-4">
          <div className="col">
            <select name="city" id="city" className="form-control">
              <option value="-" selected>
                {" "}
                --{" "}
              </option>
              <option value="Busan">부산광역시</option>
              <option value="Seoul">서울특별시</option>
            </select>
          </div>
          <div className="col">
            <select name="gu" id="gu" className="form-control">
              <option value="-">--</option>
              <option value="Nam-gu">남구</option>
              <option value="Seo-gu">서구</option>
            </select>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="상세주소"
            />
          </div>
        </div>

        <label> 생년월일 </label>
        <div className="form-row mb-4">
          <div className="col">
            <select name="year" id="year" className="form-control">
              <option value="1999">1999</option>
            </select>
          </div>
          <div className="col">
            <select name="month" id="month" className="form-control">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="col">
            <select name="day" id="day" className="form-control">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div className="form-row mb-4">
          <div className="form-group col-md-4">
            <label htmlFor="gender">성별</label>
            <select id="gender" className="form-control">
              <option value="M" selected>
                남
              </option>
              <option value="F">여</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary my-4 btn-block" type="submit">
          Sign in
        </button>

        <p>or sign up with:</p>

        <a href="#" className="mx-2" role="button">
          <i className="fab fa-facebook-f light-blue-text"></i>
        </a>
        <a href="#" className="mx-2" role="button">
          <i className="fab fa-twitter light-blue-text"></i>
        </a>
        <a href="#" className="mx-2" role="button">
          <i className="fab fa-linkedin-in light-blue-text"></i>
        </a>
        <a href="#" className="mx-2" role="button">
          <i className="fab fa-github light-blue-text"></i>
        </a>
      </form>
    </div>
  );
};

export default Signup;
