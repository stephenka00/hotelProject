import React from "react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import AddRoom from './components/room/AddRoom.jsx'
import ExistingRooms from "./components/room/ExistingRooms.jsx"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import EditRoom from "./components/room/EditRoom.jsx"
import Home from "./components/home/Home.jsx"

function App() {
  return( 
    <>
    <main>
      <Router>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/edit-room/:roomId" element={<EditRoom/>}/>
          <Route path="/existing-rooms" element={<ExistingRooms/>}/>

        </Routes>
      </Router>
    </main>
    </>
  )
  
}

export default App;
