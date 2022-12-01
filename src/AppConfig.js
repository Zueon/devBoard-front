let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
} else {
  backendHost = "https://todoapi.zueon.link";
}

export const API_BASE_URL = `${backendHost}`;

export const locations = [
  "서울",
  "부산",
  "대구",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

let residences = [];

// locationLabels.forEach((v, idx) => {
//   const newObj = { value: v, label: v };
//   residences.push(newObj);
// });
