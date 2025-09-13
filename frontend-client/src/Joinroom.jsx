import './JoinRoom.css'
function Joinroom(){


    return(
<div className="flex-container">
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
</div>
<div className="code-container">
    <input maxLength={1}></input>
    <input maxLength={0}></input>
    <input maxLength={1}></input>
    <input maxLength={0}></input>
</div>
<button>JOIN </button>





<footer>
    <hr/>
    <div className="footer-contents">
    <h5>© {new Date().getFullYear()} Lectra . All rights reserved. </h5>
    <h5> Report an Issue</h5>
    </div>

</footer>
    </div>)




}

export default Joinroom