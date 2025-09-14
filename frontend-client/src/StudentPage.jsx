import './StudentPage.css'
import './HostPage.css'
import { useState, useEffect } from 'react'

function StudentPage({ hostName, roomCode, socket }) {
    const [response, setResponse] = useState('')
    const [promptMessage, setPromptMessage] = useState("Continue with Lecture")
    
    const sendRes = () => {
        if (response.trim() && roomCode) {
            socket.emit("student-response", {
                roomCode,
                response: response.trim(),
                studentId: socket.id
            });
            setResponse('');
            console.log("Response sent:", response.trim());
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendRes();
        }
    }

    useEffect(() => {
        if (!socket) {
            console.error("Socket not provided to StudentPage");
            return;
        }

        const onQStart = (d) => {
            console.log("Question stream started:", d.message);
            setPromptMessage(d.message || "Ask Questions");
        }
        const onQStop = (d) => {
            console.log("Question stream stopped:", d.message);
            setPromptMessage(d.message || "Question stream ended");
        }
        const onRStart = (d) => {
            console.log("Reaction stream started:", d.message);
            setPromptMessage(d.message || "Reactions open");
        }
        const onRStop = (d) => {
            console.log("Reaction stream stopped:", d.message);
            setPromptMessage(d.message || "Reactions closed");
        }
        const onEnded = (d) => {
            console.log("Class ended:", d.message);
            setPromptMessage(d.message || "Class ended");
            alert("Class has ended");
        }

        // Set up socket listeners
        socket.on("question-stream:start", onQStart);
        socket.on("question-stream:stop", onQStop);
        socket.on("reaction-stream:start", onRStart);
        socket.on("reaction-stream:stop", onRStop);
        socket.on("class:ended", onEnded);

        // Cleanup listeners when component unmounts
        return () => {
            socket.off("question-stream:start", onQStart);
            socket.off("question-stream:stop", onQStop);
            socket.off("reaction-stream:start", onRStart);
            socket.off("reaction-stream:stop", onRStop);
            socket.off("class:ended", onEnded);
        };
    }, [socket]) // Only depend on socket

    return (
        <div className="flex-container">
            <div className="header">
                <h4>CREATE A ROOM NOW</h4>
                <h4>JOIN ROOM</h4>
                <h4 style={{ marginLeft: 'auto' }}>ABOUT US</h4>
            </div>
            <hr />

            <div className="branding">
                <h1>LECTRA</h1>
                <h2>The Live lecture where every lecture speaks back.</h2>
                <h3>Turn every lecture into a connected, engaging, and memorable sessions</h3>
            </div>

            <h1 style={{fontFamily: "Montserrat",fontWeight: 400}}>{hostName || "Unknown Host"}'s Lecture</h1>

            <div className="commandsSection">
                <div className="prompt-section">
                    <h3>{promptMessage}</h3>
                    <input
                        type="text"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        onKeyDown={handleKeyDown} // Fixed: Changed from onKeyPress to onKeyDown
                        placeholder="Enter your response..."
                    />
                    <button
                        className="action-button"
                        onClick={sendRes}
                        disabled={!response.trim()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StudentPage