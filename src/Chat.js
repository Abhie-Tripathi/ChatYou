import React,{useState,useEffect} from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./css/chat.css";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import { doc,getDoc } from "firebase/firestore";
import db from "./firebase";

function Chat() {
  const { roomId } = useParams();
  const [room,setroom] = useState("")
  const docRef = doc(db, "rooms", roomId);

  useEffect(()=>{
    if(roomId){
    getDoc(docRef).then((data)=>setroom(data.data().name))
    }
  },[roomId,docRef])


  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{room}</h3>
          <p>Last Seen..</p>
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
        <p className="chat__message chat__receiver">
          <span className="chat__name">Abhinav</span>
          This is test message
          <span className="chat__time">12:40 PM</span>
        </p>
        <p className="chat__message chat__receiver">
          <span className="chat__name">Abhinav</span>
          This is test message
          <span className="chat__time">12:40 PM</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Abhinav</span>
          This is test message
          <span className="chat__time">12:40 PM</span>
        </p>
      </div>

      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <AttachFileIcon />
        <form>
          <input type="text" placeholder="Type your message" />
          <input type="submit" />
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
