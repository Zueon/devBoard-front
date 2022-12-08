import React, { useState } from "react";

const TestPage = () => {
  function alarm() {
    const eventSource = new EventSource(`/subscribe/` + inputValue);

    eventSource.addEventListener("sse", function (event) {
      console.log(event.data);

      const data = JSON.parse(event.data);

      (async () => {
        // 브라우저 알림
        const showNotification = () => {
          const notification = new Notification("코드 봐줘", {
            body: data.content,
          });

          setTimeout(() => {
            notification.close();
          }, 10 * 1000);

          notification.addEventListener("click", () => {
            window.open(data.url, "_blank");
          });
        };

        // 브라우저 알림 허용 권한
        let granted = false;

        if (Notification.permission === "granted") {
          granted = true;
        } else if (Notification.permission !== "denied") {
          let permission = await Notification.requestPermission();
          granted = permission === "granted";
        }

        // 알림 보여주기
        if (granted) {
          showNotification();
        }
      })();
    });
  }

  const [inputValue, setInputVale] = useState();
  return (
    <div>
      <input
        type="text"
        placeholder="사용자 id"
        value={inputValue}
        onChange={(e) => {
          setInputVale(e.target.value);
          console.log(inputValue);
        }}
      />
      <input type="button" value="login" onClick={alarm} />
    </div>
  );
};

export default TestPage;
