import React, { useState, useEffect, useRef } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./css/chat.css";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import {
  addDoc,
  doc,
  onSnapshot,
  collection,
  serverTimestamp,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import db  from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [{user},dispatch] = useStateValue()
  const messageInputRef = useRef();
  const { roomId } = useParams();
  const [room, setRoom] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, "rooms", roomId);
      onSnapshot(roomRef, (snapshot) => {
        setRoom(snapshot.data().name);
      });
    }
    if(roomId){
    const messageQuery = query(
      collection(db, "rooms", roomId, "message"),
      orderBy("timestamp")
    )

    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => doc.data());
      setMessages(messageList);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the message snapshot listener when component unmounts
    }}
  }, [roomId]);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredMessage = messageInputRef.current.value;
    if(enteredMessage===""){
      return(alert("Please Enter Your Message"))
    }

    const messageRef = collection(db, "rooms", roomId, "message");
    addDoc(messageRef, {
      name: user.displayName,
      message: enteredMessage,
      timestamp: serverTimestamp(),
    })
    messageInputRef.current.value = "";
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/125.svg`}/>
        <div className="chat__headerInfo">
          <h3>{room}</h3>
          <p>{
            new Date(messages[messages.length-1]?.timestamp?.seconds*1000).toLocaleTimeString()
            }</p>
        </div>
        <div className="header__right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat__message ${
              user.displayName===message.name ? "chat__receiver" : ""
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__time">{
            new Date(message.timestamp?.seconds*1000).toLocaleTimeString()
            }</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <AttachFileIcon />
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="Type your message" ref={messageInputRef} />
          <input type="submit" />
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
