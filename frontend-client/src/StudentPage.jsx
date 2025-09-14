import './StudentPage.css'
import './HostPage.css'
import { useState, useEffect } from 'react'

function StudentPage({ hostName, roomCode, socket }) {
    const [response, setResponse] = useState('')
    const [promptMessage, setPromptMessage] = useState("Continue with Lecture")
    const [submissionStatus, setSubmissionStatus] = useState('')
    const [questions, setQuestions] = useState([])
    const [isQuestionStreamActive, setIsQuestionStreamActive] = useState(false)
    
    const sendRes = () => {
        if (response.trim() && roomCode && socket) {
            console.log("Sending response:", response.trim(), "to room:", roomCode);
            socket.emit("student-response", {
                roomCode,
                response: response.trim(),
                studentId: socket.id
            });
            setResponse('');
            setSubmissionStatus('Sending...');
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
            setIsQuestionStreamActive(true);
        }
        
        const onQStop = (d) => {
            console.log("Question stream stopped:", d.message);
            setPromptMessage(d.message || "Continue with Lecture");
            setIsQuestionStreamActive(false);
        }
        
        const onRStart = (d) => {
            console.log("Reaction stream started:", d.message);
            setPromptMessage(d.message || "Share your reactions");
            setIsQuestionStreamActive(false);
        }
        
        const onRStop = (d) => {
            console.log("Reaction stream stopped:", d.message);
            setPromptMessage(d.message || "Continue with Lecture");
        }
        
        const onEnded = (d) => {
            console.log("Class ended:", d.message);
            setPromptMessage(d.message || "Class ended");
            setIsQuestionStreamActive(false);
            alert("Class has ended");
        }

        const onResponseSubmitted = (d) => {
            console.log("Response submitted:", d.message);
            setSubmissionStatus('✓ Sent');
            setTimeout(() => setSubmissionStatus(''), 2000);
        }

        // Listen for new questions from other students
        const onNewQuestion = (data) => {
            console.log("New question received:", data);
            if (data.roomCode === roomCode) {
                setQuestions(prev => [...prev, {
                    id: Date.now() + Math.random(),
                    question: data.response,
                    studentId: data.studentId,
                    timestamp: new Date().toLocaleTimeString()
                }]);
            }
        }

        // Set up socket listeners
        socket.on("question-stream:start", onQStart);
        socket.on("question-stream:stop", onQStop);
        socket.on("reaction-stream:start", onRStart);
        socket.on("reaction-stream:stop", onRStop);
        socket.on("class:ended", onEnded);
        socket.on("response-submitted", onResponseSubmitted);
        socket.on("new-question", onNewQuestion); // You'll need to emit this from backend

        return () => {
            socket.off("question-stream:start", onQStart);
            socket.off("question-stream:stop", onQStop);
            socket.off("reaction-stream:start", onRStart);
            socket.off("reaction-stream:stop", onRStop);
            socket.off("class:ended", onEnded);
            socket.off("response-submitted", onResponseSubmitted);
            socket.off("new-question", onNewQuestion);
        };
    }, [socket, roomCode])

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

            <h1 style={{ fontFamily: "Montserrat", fontWeight: 400 }}>
                {hostName || "Unknown Host"}'s Lecture
            </h1>

            <div className="commandsSection">
                {/* Questions Display - Only show when question stream is active */}
                {isQuestionStreamActive && (
                    <div className="questions-display">
                        <h3 style={{ 
                            color: '#007bff',
                            marginBottom: '10px',
                            fontSize: '18px'
                        }}>
                            Live Questions ({questions.length})
                        </h3>
                        <div className="questions-scroll-container">
                            {questions.length === 0 ? (
                                <p style={{ 
                                    color: '#666', 
                                    textAlign: 'center',
                                    padding: '20px',
                                    fontStyle: 'italic'
                                }}>
                                    No questions yet. Be the first to ask!
                                </p>
                            ) : (
                                questions.map((q) => (
                                    <div key={q.id} className="question-item">
                                        <div className="question-content">
                                            <p>{q.question}</p>
                                            <small className="question-timestamp">
                                                {q.timestamp}
                                            </small>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                <div className="prompt-section">
                    <h3 style={{ 
                        color: promptMessage.includes('Ask Questions') ? '#007bff' : 
                               promptMessage.includes('reactions') ? '#28a745' : '#333',
                        transition: 'color 0.3s ease'
                    }}>
                        {promptMessage}
                    </h3>
                    
                    {submissionStatus && (
                        <p style={{ 
                            color: 'green',
                            fontSize: '14px',
                            margin: '5px 0'
                        }}>
                            {submissionStatus}
                        </p>
                    )}
                    
                    <input
                        type="text"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            promptMessage.includes('Ask Questions') ? "Type your question here..." :
                            promptMessage.includes('reactions') ? "Share your reaction..." :
                            "Enter your response..."
                        }
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                    />
                    <button
                        className="action-button"
                        onClick={sendRes}
                        disabled={!response.trim()}
                        style={{
                            opacity: response.trim() ? 1 : 0.6,
                            cursor: response.trim() ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StudentPage