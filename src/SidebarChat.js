import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import "./css/sidebar.css";
import { useEffect } from "react";
import db from "./firebase";
import { collection,addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function SidebarChat({id, name, addnewchat}) {

  const [seed, setseed] = useState("");
  const roomsCollectionRef = collection(db,"rooms")

  const createChat = () =>{
    const room = prompt("Please Enter Room Name")
    if(room){
      addDoc(roomsCollectionRef,{name:room})
    }
  }
  
  useEffect(()=>{
    setseed(Math.floor(Math.random() * 5000))
  },[])


  return !addnewchat ? (
    <Link to={`/room/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
    <div className="sidebar__Chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar__ChatInfo">
        <h2>{name}</h2>
        <p>Last Message...</p>
      </div>
    </div>
    </Link>
  ) : (
    <div className="sidebar__Chat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
