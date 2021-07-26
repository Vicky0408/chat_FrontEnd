import React, {useState} from 'react'
import './join.css'
import logo from '../../logo.svg'
import {Link} from 'react-router-dom'

let user;
const sendUser =() => {
    user = document.getElementById('JoinInput').value;
    document.getElementById('JoinInput').value="";
}
const Join = () => {
    const [name,setName] = useState("")

    return (
        <div className='JoinPage'>
            <div className='JoinContainer'>
                <img src={logo} alt="logo" />
                <h1>Join</h1>
                <input onChange={(e) =>setName(e.target.value)} placeholder="Enter Your Name" type="text" id="JoinInput" />
               <Link onClick={(event) => !name ? event.preventDefault(): null} to="/chat">
                   <button onClick={sendUser} className="Joinbtn">Login In</button></Link>
            </div>
           
        </div>
    )
}

export default Join 
export  {user}