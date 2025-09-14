import './JoinRoom.css'
import './HostPage.css'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

function HostPage({userCode}){

      const ack = (res) => {
    if (!res?.ok) console.error(res?.error || "unknown error")
  }

  
  const startQuestionStream = () => {
    socket.emit("question-stream:start", { userCode }, ack)
  }
  const stopQuestionStream = () => {
    socket.emit("question-stream:stop", { userCode }, ack)
  }

  // reaction stream no pun  intened
  const startReactionStream = () => {
    socket.emit("reaction-stream:start", { userCode }, ack)
  }
  const stopReactionStream = () => {
    socket.emit("reaction-stream:stop", { userCode }, ack)
  }

  // END CLASS
  const endClass = () => {
    socket.emit("class:end", { userCode }, ack)
  }



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

<h3>Turn every lecture into a connected, engaging, and memorable sessions</h3>
</div>
<div className="relevant-info">
<h2>Room Number:  {userCode}</h2>
<h2>Host Control Panel</h2>
</div>
<div className="commandsSection">
<div>
<button onClick={startQuestionStream}> Launch Question Stream</button>
<button onClick={startQuestionStream}> End Question Stream</button>
</div>
<div>
<button onClick={startReactionStream}>Launch Reaction Stream</button>
<button onClick={startReactionStream}>Launch Reaction Stream</button>
</div>
<button  onClick={endClass}>End Room</button>
</div>

<footer>
    <hr/>
    <div className="footer-contents">
    <h5>© {new Date().getFullYear()} Lectra . All rights reserved. </h5>
    <h5> Report an Issue</h5>
    </div>

</footer>
</div>


)




}

export default HostPage