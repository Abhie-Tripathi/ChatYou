import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import "./css/sidebar.css";
import { useEffect } from "react";
import db from "./firebase";
import { collection,addDoc,query,orderBy,onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

function SidebarChat({id, name, addnewchat}) {

  const [seed, setseed] = useState("");
  const [lastmessage,setlastmessage] = useState("")
  const roomsCollectionRef = collection(db,"rooms")

  const createChat = () =>{
    const room = prompt("Please Enter Room Name")
    if(room){
      addDoc(roomsCollectionRef,{name:room})
    }
  }
  
  useEffect(()=>{
    setseed(Math.floor(Math.random() * 5000))
   if(id){
    const messageQuery = query(
      collection(db, "rooms", id, "message"),
      orderBy("timestamp","desc")
    )

    onSnapshot(messageQuery, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => doc.data());
      setlastmessage(messageList);
    });

  }

  },[])

  


  return !addnewchat ? (
    <Link to={`/room/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
    <div className="sidebar__Chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar__ChatInfo">
        <h2>{name}</h2>
        <p>{lastmessage[0]?.message}</p>
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
