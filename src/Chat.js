import React, { useState, useEffect }from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './Chat.css'
import { useParams } from 'react-router';
import database from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';


function Chat() {

  const [input, setInput]=useState('');
  const [seed, setSeed]=useState('');
  const { roomId }=useParams();
  const [roomName, setRoomName]=useState('');
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();

  useEffect(()=>{
    if(roomId){
      database.collection('rooms').doc(roomId).onSnapshot((snapshot)=>{
        setRoomName(snapshot.data().name)
      })

      database.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()))
      });
    }
  },[roomId])

  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000));
  },[roomId]);

  const sendMessage=(event)=>{
    event.preventDefault();
    
    database.collection('rooms').doc(roomId).collection("messages").add({
      message:input,
      name:user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');
  }

  const onType=(event)=>{
    setInput(event.target.value)
  }
  
  return (
    <div className="chat">
      <div className="chat__header">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
      <div className="header__details">
        <h3>{roomName}</h3>
        <p>Last seen at {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
      </div>
      <div className="header__icons">
         <IconButton>
            <SearchOutlined/>
          </IconButton>
         <IconButton>
            <AttachFile/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
      </div>
      </div>
      <div className="chat__box">
        {messages.map(message=>(
        <p className={`chat__message ${message.name===user.displayName && "chat__receiver"}`}>
        <span className="chat__name">
          {message.name}
        </span>
          {message.message}
          <span className="chat__time">
            {new Date(message.timestamp?.toDate()).toUTCString()}
          </span>
        </p>
        ))}
       
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input value={input} onChange={onType} placeholder="Type a message" type="text"/>
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon/>
      </div>
    </div>
  )
}

export default Chat
