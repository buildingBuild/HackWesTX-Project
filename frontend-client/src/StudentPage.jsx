import './StudentPage.css'
import './HostPage.css'
function StudentPage(){

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


<h1>Dr Stones Room</h1>
<div className="commandsSection">
<div className="prompt-section">
<h1>How do you feel about that ? </h1>

<button className="action-button">Launch Poll Stream</button>
</div>

</div>
</div>

)



}

export default StudentPage