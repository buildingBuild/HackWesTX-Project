import './JoinRoom.css'
import './HostPage.css'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

function HostPage({userCode}){

const launchQuestionStream = () =>{
socket.emit("question-stream", { userCode }, (res) => {
    if (res.ok) {
    
    } 
    else {
      console.error("Failed to join room:", res.error)
      document.getElementById("possible-error").textContent = res.error
    }
  })

}


const ReactionStream = () =>{
socket.emit("reaction-stream", { userCode }, (res) => {
    document.getElementById("possible-error").textContent = ""
    if (res.ok) {
      console.log("Joined room successfully:", code)
      hostName = res.hostName
      setStudentView(true) 
    } else {
      console.error("Failed to join room:", res.error)
      document.getElementById("possible-error").textContent = res.error

    }
  })
    
}

const endClass = () =>{
socket.emit("end-class", { userCode }, (res) => {
    if (res.ok) {
     
    } 
    else 
    {
      

    }
  })
    
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
<button onClick={launchQuestionStream}> Launch Reaction Stream</button>
<button onClick={ReactionStream}>Launch Question Stream</button>
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