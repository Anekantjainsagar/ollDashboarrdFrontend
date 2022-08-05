import React from 'react'

import './css/Navbar.css'
import './css/Topbar.css'
import './css/usersData.css'

import Nav from './Components/Nav';
import Topbar from './Components/Topbar/Topbar';
import UsersData from './Components/UsersData/UsersData';

function App() {
  return (
    <div style={{backgroundColor:"#000",height:'100vh',padding:"1.5rem"}}>
      <Nav/>
      <Topbar/>
      <UsersData/>
    </div>
  );
}

export default App;
