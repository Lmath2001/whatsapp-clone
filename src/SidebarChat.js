import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import database from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat(props) {

  const {addnewChat, id, name}=props;

  const [seed, setSeed]=useState('');
  const [messages, setMessages]=useState([]);

  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000));
  },[]);

  useEffect(()=>{
       if(id){
          database.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
              setMessages(snapshot.docs.map((doc) => doc.data()))
          })
        }
  },[id])

  const createChat=()=>{
    const roomName=prompt("Enter the room name");

    //Adding a new chat
    if(roomName){
      database.collection('rooms').add({
        name:roomName
      })
    }
  }

  return !addnewChat ?(

    <Link to={`/rooms/${id}`}>
    <div className="sidebar__chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
      <div className="sidebar__chat__details">
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>
      </div>
    </div>
    </Link>

  ):(
     <div onClick={createChat} className="sidebar__chat">
      <h2>Add a new Chat</h2>
    </div>
  );
}

export default SidebarChat
