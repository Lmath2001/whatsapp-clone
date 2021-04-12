import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core';

import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from './SidebarChat'
import './Sidebar.css'
import database from './firebase';
import { useStateValue } from './StateProvider';


function Sidebar() {

  const [rooms, setRooms]=useState([]);

  const [{user}, dispatch] = useStateValue();

  useEffect(()=>{
    database.collection('rooms').onSnapshot((snapshot)=>{
      setRooms(snapshot.docs.map((element)=>{
        return({
          id: element.id,
          data:element.data()
        })
      }))
    })
  },[])


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL}/>
        
        <div className="siderbar__headicons">
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
      <div className="sidebar__search">
        <div className="searchbox">
          <SearchOutlined />
          <input type="search" name="search" id="search" className= "search__input" placeholder="Search"/>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addnewChat/>
        {rooms.map((element)=>{
          return (<SidebarChat key={element.id} id={element.id} name={element.data.name}/>);
        })}
      </div>
    </div>
  )
}

export default Sidebar
