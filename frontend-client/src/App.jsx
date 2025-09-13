import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //lets do homepage, joinRoomn, professor view, general student view
const [page, setpage] = useState("home-createRoom")


  return (
    <>
    <button onClick={() => setpage("HOME?")}></button>
    <button onClick={() => setpage("ABOUT US")}></button>
      {page === "home" && <Homepage/>}
      {page === "about" && <About/>}
    </>
  )
}

export default App
