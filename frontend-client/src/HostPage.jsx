import './JoinRoom.css'
import './HostPage.css'


function HostPage({userCode}){

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

<h1>Room Number:  {userCode}</h1>
<h1>Host Control Panel</h1>
<div className="commandsSection">
<button>Launch Reaction Stream</button>
<button>Launch Question Stream</button>
<button>Launch Rating Stream</button>
<button>End Room</button>
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