import React from "react";
import { useEffect, useState } from "react";
import "./chat.css";

const Chat=(roomNum)=>{
    let nickname = sessionStorage.getItem("NICKNAME");
    const [value,setValue] = useState(null);
    const [message, setMessage] = useState("");

    const [listening, setListening] = useState(false);

    const getSendMsgBox=(data)=>{
        let convertTime;
        let md = data.createdAt.substring(5,10);
        let tm = data.createdAt.substring(11,16);
        convertTime = tm + "|" + md;


        return `<div class="sent_msg">
                <p>${data.msg}</p>
                <span class="time_date"> ${convertTime} / ${data.sender}</span>
                </div>`
    }
    const getReceiveMsgBox=(data)=>{
        let convertTime;
        let md = data.createdAt.substring(5,10);
        let tm = data.createdAt.substring(11,16);
        convertTime = tm + "|" + md;


        return `<div class="sent_msg">
                <p>${data.msg}</p>
                <span class="time_date"> ${convertTime} / ${data.sender}</span>
                </div>`
    }

    function initMyMessage(data){
        let chatBox = document.querySelector("#chat-box");
    
    
        //alert(msgInput.value)
        let sendBox = document.createElement("div");
        sendBox.className = "outgoing_msg";
        
        sendBox.innerHTML = getSendMsgBox(data);
        chatBox.append(sendBox);
    
        document.documentElement.scrollTop = document.body.scrollHeight;
    }

    function initYourMessage(data){
        let chatBox = document.querySelector("#chat-box");
    
    
        //alert(msgInput.value)
        let receivedBox = document.createElement("div");
        receivedBox.className = "outgoing_msg";
        
        receivedBox.innerHTML = getReceiveMsgBox(data);
        chatBox.append(receivedBox);
        document.documentElement.scrollTop = document.body.scrollHeight;
    }


    async function addMessage(){

    
    
        let chat = {
            sender : nickname,
            roomNum : roomNum.roomNum,
            msg : message
        };
    
        await fetch("http://localhost:9090/chat",{
            method:"post",//http post메서드(새로운 데이터를 write)
            body: JSON.stringify(chat),
            headers:{
                "Content-Type":"application/json"
            }
        });
        setListening(true);
        setMessage("");

    }

    useEffect(()=>{
        
console.log(nickname);
console.log(roomNum.roomNum);
    let eventSource = new EventSource(`http://localhost:9090/chat/roomNum/${roomNum.roomNum}`);
        
        eventSource.onopen = event => {
        }
        eventSource.onmessage = event =>{
            setValue(JSON.parse(event.data));
            if(value.sender === nickname){
                initMyMessage(value);
            }else{
                initYourMessage(value);
            }
            setListening(false);
        }

        eventSource.onerror=(error) =>{
            console.log("SSE For Users error",error);
            eventSource.close();
        }
},[listening])


const inputChangeHandler=(e)=>{
        setMessage(e.target.value);
    
}
    


return(
    <div className="container-fluid">

    <div className="row">

      <div className="col-sm-12">


        <div id="user_chat_data" className="user_chat_data">

          <div className="container-fluid chat_section" id="chat-box">

          </div>

          <div className="type_msg">
            <div className="input_msg_write">
              <input id="chat-outgoing-msg" type="text" className="write_msg" placeholder="Type a message" onChange={inputChangeHandler} />
              <button id="chat-send" className="msg_send_btn" type="button" onClick={addMessage}><i className="fa fa-paper-plane"
                  aria-hidden="true"></i></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
)
}

export default Chat;