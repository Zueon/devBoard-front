import { useCallback, useEffect, useRef, useState } from "react"
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import "./Chat.css";
import sendIcon from "./send.svg"
import { keyboard } from "@testing-library/user-event/dist/keyboard";


var reconnect = 0;


const Chat = (roomNum) => {
    
    let user = sessionStorage.getItem("NICKNAME");


    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [sender, setSender]= useState(user);
    const messagesRef = useRef(null);
    const ws = useRef(null);
    const sock = useRef(null);
    
    

    useEffect(()=>{
        async function fetchData(){
            sock.current = new SockJS('http://localhost:9090/ws-stomp');
            ws.current = Stomp.over(sock.current);
            
        await axios.get('http://localhost:9090/roomNum/'+roomNum.roomNum).then((response)=>{
            setMessages(response.data);
         })
        }
        fetchData();


        
    },[])


    useEffect(()=>{
        const connect = ws.current.connect({}, function(frame){
            console.log("실행");
            
            ws.current.subscribe("/sub/roomNum/"+roomNum.roomNum, function(msg){
                console.log('msg :>> ', msg);
                const recv = JSON.parse(msg.body);
                recvMessage(recv);
            })
        
        }, function(error){
            if(reconnect++<=5){
                setTimeout(function(){
                    console.log("connection reconnect");
                    console.log("error",error);
                    sock.current = new SockJS("http://localhost:9090/ws-stomp",);
                    ws.current = Stomp.over(sock);
                    connect();
                },10*1000);
            }
        })
    },[messages])

    useEffect(()=>{
        if (messagesRef) {
            messagesRef.current.addEventListener('DOMNodeInserted', event => {
              const { currentTarget: target } = event;
              target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
          }
    },[messages])


    const saveMessage=(e)=>{
            setMsg(e.target.value)
        
    }


    function keydownHandler(e){
        let data ={
            sender : sender,
            msg : msg,
            roomNum : roomNum.roomNum,
        }
        if(e.keyCode===13 && msg!==''){
            ws.current.send("/pub/message",{},JSON.stringify(data));
            setMsg('');
            
        }else if(e.keyCode===13){
            alert("입력하세요");
        }
    }

    function clickHandler(e){
        let data ={
            sender : sender,
            msg : msg,
            roomNum : roomNum.roomNum,
        }
            if(msg!==''){
            ws.current.send("/pub/message",{},JSON.stringify(data))
            
            setMsg('');
        }else{
            alert("입력하세요");
        }
        
    }

    function recvMessage(recv){
        setMessages(prev=>[...prev, recv]);
    }

    
    
    
    return(
        
        <div className="App">
            <div className="chat">
            <div className="head">ChatBot</div>
                <div className="messages" ref={messagesRef}>
                    {messages.map((m, i) => (<div className="message"><div key={i} className={`msg${m.sender!==user ? ' dark' : ''}`}>{m.sender} : {m.msg}</div><br/></div>))}
                </div>
                <div className="footer">
                    <input type="text" value={msg} placeholder="Type here..." onChange={saveMessage} onKeyDown={keydownHandler}/>
                    <img src={sendIcon} onClick={clickHandler}/>
                </div>
            </div>
        </div>
        
    )
}
export default Chat;