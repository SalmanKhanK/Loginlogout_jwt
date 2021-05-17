import axios from 'axios';
import React,{useState} from 'react'
import {Profile} from './Profile'
import {Link} from 'react-router-dom'
import swal from "sweetalert"
import '../Style/Loginuser.css'
import '../Style/Userregister.css'
export const Loginuser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tokenid,SetTokenid]=useState("");
    var [loginsuccess,setloginSuccess]=useState(false)
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(email,password)
        axios.post("http://localhost:5000/api/auth",{
            email,password 
        },{
            headers:{
               'content-type': 'application/json'
              }
            }).then(res=>{
           
            // SetTokenid(res.data.token)
            localStorage.setItem("token",res.data.token)
            console.log(res.data.token)
            console.log(res.data.name)
            setloginSuccess(true)
        }).catch(function (error) {
            if (error.response) {
                  swal("Error",error.response.data,"error");
            }
          });
       
    }
    // console.log(tokenid)
    console.log(localStorage.getItem("token"))
    if(loginsuccess){
        return <Profile/>
    }
    return (
        <div className="logindiv">
                <h2 className="textLogin">Login</h2>
            <form onSubmit={handleSubmit} className="formLogin">
                <div>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" required />
                </div>
                <div>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" required/>
                </div>
                    <input type="submit" value="Login" /> 
                    <br/>
            <Link to="/registerationUser">Sign up </Link>
   
            </form>
        </div>
    )
}