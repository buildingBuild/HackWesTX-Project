import './StudentPage.css'
import './HostPage.css'
import { useState } from 'react'
import { useEffect } from 'react'
import {io} from 'socket.io-client'
const socket = io("http://localhost:3001")
function StudentPage(prop){
const  sendRes = () => {
  
  
 
}
    useEffect(() =>{
    const onQStart = (d) => document.getElementById("prompt-message").textContent = d.message
    const onQStop  = (d) => document.getElementById("prompt-message").textContent = d.message
    const onRStart = (d) => document.getElementById("prompt-message").textContent = d.message
    const onRStop  = (d) => document.getElementById("prompt-message").textContent = d.message
    const onEnded  = (d) => document.getElementById("prompt-message").textContent = d.message

    socket.on("question-stream:start", onQStart);
    socket.on("question-stream:stop",  onQStop);
    socket.on("reaction-stream:start", onRStart);
    socket.on("reaction-stream:stop",  onRStop);
    socket.on("class:ended",          onEnded);

  return () => {
      socket.off("question-stream:start", onQStart);
      socket.off("question-stream:stop",  onQStop);
      socket.off("reaction-stream:start", onRStart);
      socket.off("reaction-stream:stop",  onRStop);
      socket.off("class:ended",           onEnded);
    };
},[socket])
return(
    <div className="flex-container">
    <div className="header">
        <h4>CREATE A ROOM NOW</h4>
        <h4>JOIN ROOM </h4>
        <h4 style={{marginLeft: 'auto'}}>ABOUT US</h4>
    </div>
    <hr/>

<div className="branding">
<h1>LECTRA</h1>
<h2>The Live lecture where every lecture speaks back.</h2>
<h3>Turn every lecture into a connected, engaging, and memorable sessions</h3>
</div>


<h1>{prop.hostName}'s Room</h1>
<div className="commandsSection">
<div className="prompt-section">
<h3 id="prompt-message">How do you feel about that ? </h3>
<input></input>
<button className="action-button" onClick={sendRes}>Submit</button>
</div>

</div>
</div>

)



}

export default StudentPage