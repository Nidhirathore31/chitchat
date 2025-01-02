import { useState } from 'react'
import './App.css'
import Chat from './components/Chat'
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';


function App() {
  const [user] = useAuthState(auth);

  return (
    <div >
      <NavBar />
      {!user ?<Welcome/> : <Chat/>}
    </div>
  );
}

export default App
