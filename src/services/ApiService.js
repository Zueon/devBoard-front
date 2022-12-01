import axios from "axios";
const { API_BASE_URL } = require("../AppConfig");

export const call = async (api, method, request) => {
  try {
    const options = {
      method: method,
      url: API_BASE_URL + api,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    // 요청 바디가 존재하는 경우에 옵션의 data 속석으로 해당 내용들을 넣어준다.
    if (request) options.data = request;

    const response = await axios(options);

    return response;
  } catch (error) {
    console.log(error);
    // if (error.response.status === 403) {
    //   window.location = "/";
    // }
  }
};
