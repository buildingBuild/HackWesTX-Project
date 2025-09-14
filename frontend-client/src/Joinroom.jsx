import './JoinRoom.css'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import StudentPage from './StudentPage'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")
let hostName = ""

function Joinroom(){
const [showStudentView, setStudentView] = useState(false)

   const joinlecture = () => {

let code = ""
console.log("HELLO")
const inputs = document.querySelectorAll(".code-container input")

inputs.forEach((input) =>{

   code += input.value
})

console.log(code)

socket.emit("join-room", { code }, (res) => {
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

    return(
<div className="flex-container">
    {showStudentView ? (
      <StudentPage hostName={hostName}/>
    ) : (
      <>
        <div className="header">
            <h4>CREATE A ROOM</h4>
            <h4>JOIN ROOM </h4>
            <h4 style={{marginLeft: 'auto'}}>ABOUT US</h4>
        </div>
        <hr/>

        <div className="branding">
        <h1>LECTRA</h1>
        <h2>The Live lecture where every lecture speaks back.</h2>
        <h3>Turn every lecture into a connected, engaging, and memorable sessions</h3>
        </div>
        <div className="forTheVibes">
        <h3>JOIN LECTURE ROOM</h3>
        <h2 id="possible-error" style={{textAlign: 'center', fontFamily: 'sans-serif',fontSize: '1em', color: 'red'}}></h2>
        </div>
        <div className="code-container">
            <input maxLength={1}></input>
            <input maxLength={1}></input>
            <input maxLength={1}></input>
            <input maxLength={1}></input>
        </div>
        <button onClick={joinlecture}> JOIN </button>

        <footer>
            <hr/>
            <div className="footer-contents">
            <h5>© {new Date().getFullYear()} Lectra . All rights reserved. </h5>
            <h5> Report an Issue</h5>
            </div>

        </footer>
      </>
    )}
</div>
)

}

export default Joinroom
