import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import io from 'socket.io-client'
import Joinroom from './Joinroom'
const socket = io.connect("http://localhost:3001")

function App() {
 


// SENDERS / EMMITTERS
const sendMessage = (data) => {
socket.emit("send_message", {message : `${data}`})
}

const joinRoom = (room) => {
socket.emit("join-room", {message : {room}})
}



// LISTENERS ON
useEffect(() =>{
  socket.on("rec" ,(data) =>{
    alert(data.message)

  })

   socket.on("tamed" ,(data) =>{
    alert(data.message)

  })




},[socket])




  return (
<></>



  )
}

export default App
/*
 <div className="App">
<input placeholder='enter me'></input>
<button onClick={sendMessage}> Send message </button>
<button onClick={joinRoom}> Join Room </button>
*/






//lets do homepage, joinRoomn, professor view, general student view

/*
   <button onClick={() => setpage("HOME?")}></button>
    <button onClick={() => setpage("ABOUT US")}></button>
      {page === "home" && <Homepage/>}
      {page === "about" && <About/>}
 <button onClick={() => setpage("HOME?")}></button>
    <button onClick={() => setpage("ABOUT US")}></button>
    */
     //lets do homepage, joinRoomn, professor view, general student view