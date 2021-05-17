import axios from 'axios';
import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import swal from "sweetalert"
import '../Style/Loginuser.css'
import { Loginuser } from './Loginuser';
export const Useregister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    var [regSuccess,setRegSuccess]=useState(false)
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(name,email,password)
        await axios.post("http://localhost:5000/api/users",{
           name,email,password 
        }).then(res=>{
            setRegSuccess(true)
            console.log(res.data)
        }).catch(function (error) {
            if (error.response) {
                  swal("Error",error.response.data,"error");
            }
          });
        setName("")
        setEmail("")
        setPassword("")
      
       
    }
  
    if(regSuccess){
        return <Loginuser/>
    }
    return (
        <div className="logindiv">
             <h2 className="textSignup">Sign up</h2>
            <form onSubmit={handleSubmit} className="formLogin">
                <div>
                    <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" required />
                </div>
                <div>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" required/>
                </div>
                <div>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" required/>
                </div>
                    <input type="submit" value="Signup" /> 
                    <br/>
                    <Link to="/">Already have an account</Link>
                 
            </form> 
        </div>
    )
}
