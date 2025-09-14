import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Homepage from './Homepage.jsx'
import Joinroom from './Joinroom.jsx'
import HostPage from './HostPage.jsx'
import StudentPage from './StudentPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Joinroom></Joinroom>

  </StrictMode>,
)
