import axios from "axios";
import { createRef } from "react";
const { API_BASE_URL } = require("../AppConfig");
const ACCESS_TOKEN = "ACCESS_TOKEN";
const NICKNAME = "NICKNAME";
const MID = "MID";
const EMAIL = "EMAIL";

export function AuthenticatedLink({ url, filename, children }) {
  const link = createRef();
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const handleAction = async () => {
    if (link.current.href) {
      return;
    }

    const result = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const blob = await result.blob();
    const href = window.URL.createObjectURL(blob);

    link.current.download = filename;
    link.current.href = href;

    link.current.click();
  };

  return (
    <>
      <a role="button" ref={link} onClick={handleAction}>
        {children}
      </a>
    </>
  );
}

export const call = async (api, method, request) => {
  try {
    const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

    const options = {
      method: method,
      url: API_BASE_URL + api,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // 요청 바디가 존재하는 경우에 옵션의 data 속석으로 해당 내용들을 넣어준다.
    if (request) options.data = request;

    if (accessToken && accessToken !== null) {
      options.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await axios(options);

    return response;
  } catch (error) {
    console.log(error);
    if (error.response.status === 403) {
      window.location = "/login";
    }
  }
};

export async function signin(member) {
  const response = await call("/auth/signin", "POST", member);
  const accessToken = response.data.accessToken;
  const nickname = response.data.nickname;
  const mid = response.data.mid;
  const email = response.data.email;

  if (response.status === 200) {
    if (accessToken) {
      sessionStorage.setItem(ACCESS_TOKEN, accessToken);
      sessionStorage.setItem(NICKNAME, nickname);
      sessionStorage.setItem(MID, mid);
      sessionStorage.setItem(EMAIL, email);

      window.location = "/";
    }
  } else if (response.status == 400) {
    alert(response.data.error);
  }
  console.log(response);
}

export function signout() {
  sessionStorage.setItem(ACCESS_TOKEN, null);
  sessionStorage.setItem(NICKNAME, null);
  sessionStorage.setItem("MID", null);

  window.location.href = "/login";
}

export async function signup(member) {
  const response = await call("/auth/signup", "POST", member);
  console.log(response);
  if (response.status === 200) {
    window.location = "/success?type=계정";
  }
}
