// import http from "../http-common";

// export function uploadFiles(file, onUploadProgress) {
//   let formData = new FormData();

//   formData.append("file", file);

//   return http.post("/upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     onUploadProgress,
//   });
// }

// export function getFiles() {
//   return http.get("/files");
// }

import http from "../http-common";

export function uploadFiles(file, pid, onUploadProgress) {
  let formData = new FormData();

  console.log(pid);
  formData.append("file", file);

  return http.post(`/project/${pid}/files/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
}

export function getFiles(pid) {
  return http.get(`/project/${pid}/files`);
}
