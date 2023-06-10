import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';   
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import "./css/sidebar.css";
import SidebarChat from './SidebarChat';
import db from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

const Sidebar = () => {
  const [{user},dispatch] = useStateValue()
  const [rooms, setRooms] = useState([]);
  const roomsCollectionRef = collection(db, "rooms");

  useEffect(() => {
    const unsubscribe = onSnapshot(roomsCollectionRef, (querySnapshot) => {
      const roomData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setRooms(roomData);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
    };
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar src={user.photoURL} onClick={()=>auth.signOut()}/>
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
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.name}/>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
