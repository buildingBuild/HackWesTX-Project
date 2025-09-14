import './Homepage.css'
import  {useState} from 'react'
import HostPage from './HostPage'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")
let userCode = ""

function Homepage(){
const [professorView,setProfessorView] = useState(false)




const createRoom = () => {
const roomOwnerName = document.getElementById("name-id").value
const roomOwnerEmail = document.getElementById("email-id").value

console.log(roomOwnerName)
console.log(roomOwnerEmail)

let data = {
    ownerName : roomOwnerName,
    ownerEmail : roomOwnerEmail
}

socket.emit("create-room", data, (res) => {
    if (res?.ok) {
      console.log("Room created:", res.code, "Host:", res.hostId)
      userCode = res.code
      setProfessorView(true)
    } else {
      console.error(res?.error || "Unknown error creating room")
    }
  })



   }

return (
<div className="flex-container">
    {professorView ? (
      <HostPage roomNumber={userCode} />
    ) : (
      <>
        <div className="header">
          <h4>CREATE A ROOM</h4>
          <h4>JOIN ROOM </h4>
          <h4 style={{ marginLeft: 'auto' }}>ABOUT US</h4>
        </div>
        <hr/>

        <div className="branding">
          <h1>LECTRA</h1>
          <h2>The Live lecture where every lecture speaks back.</h2>
          <h3>Turn every lecture into a connected, engaging, and memorable sessions</h3>
        </div>

        <div className="input-area">
          <h4>ENTER YOUR NAME</h4>
          <input placeholder="Dr Senku Stone" id="name-id"></input>

          <h4>ENTER YOUR EMAIL ADDRESS</h4>
          <input id="email-id" placeholder="stoneworld@gmail.com"></input>
        </div>

        <button onClick={createRoom}>CREATE ROOM</button>

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

export default Homepage