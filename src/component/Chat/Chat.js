import React,{useEffect, useState,useRef} from 'react'
import {user} from '../Join/join'
import socketIo from 'socket.io-client'
import './chat.css'
import Message from '../Message/Message'
const ENDPOINT = "https://demo-vicky-chat.herokuapp.com/"


let socket;

const Chat = () => {
    const messageEl = useRef(null);
    const [id,setId] = useState("")
    const [messages, setMessages] = useState([])
    const send=() => {
       const message =document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";
    }
    const socket = socketIo(ENDPOINT, {transports :['websocket']});
    
    useEffect(() => {
        

        socket.on('connect',() => {
            setId(socket.id)
           // alert('connected')
        })
        socket.emit('joined',{user})

        socket.on('welcome',(data) => {
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('userJoined',(data) => {
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('leave',(data) => {
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        return () => {
            socket.emit('disconnect');
            socket.off();
            
        }
    }, []);

    useEffect(() => {
        socket.on('sendmessage',(data) =>{
            setMessages([...messages,data]);
            console.log(data.user,data.message,data.id)
        })
        return () => {
            socket.off()
        }
    },[messages]);


    useEffect(() => {
        if (messageEl) {
          messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])


    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header"></div>
                <div className="chatBox" ref={messageEl}>
                    
                    {messages.map((item,i) => <Message message={item.message} user={item.id===id? '': item.user} classs={item.id===id? 'right':'left'}/>)} 
                    
                   
                    {/* <Message message={"message"}/> */} 
                    
                </div>
                <div className="inputBox">
                    <input type="text" id="chatInput"/>
                    <button onClick={send} className="sendBtn">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
