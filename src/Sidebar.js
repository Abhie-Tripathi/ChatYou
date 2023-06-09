import { Avatar,IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';   
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import "./css/sidebar.css"
import SidebarChat from './SidebarChat';
import db from './firebase';
import { collection,getDocs } from 'firebase/firestore';

const Sidebar = () => {
  const [rooms,setrooms] = useState([])
  const roomsCollectionRef = collection(db,"rooms")

  useEffect(()=>{
    getDocs(roomsCollectionRef).then((data)=>setrooms(data.docs.map((doc)=>({...(doc.data()),id:doc.id}))))
  },[])

  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar/>

            <div className='sidebar__headerRight'>
              <IconButton>
              <DonutLargeIcon/>
              </IconButton>
              <IconButton>
              <ChatIcon/>
              </IconButton>
              <IconButton>
              <MoreVertIcon/>
              </IconButton>
              
            </div>
        </div>

        <div className='sidebar__search'>
          <div className='sidebar__searchContainer'>
              <SearchIcon/>
              <input type='text' placeholder='Search or Start a new Chat'/>
          </div>
        </div>
        <div className='sidebar__Chats'>
          <SidebarChat addnewchat/>
          {rooms.map((room)=><SidebarChat key={room.id} id={room.id} name={room.name}/>)}
        </div>

    </div>
  )
}

export default Sidebar