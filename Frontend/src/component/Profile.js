import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {Loginuser} from './Loginuser'
import '../Style/Userregister.css'
export const Profile = () => {
     const [loginPage, setLoginpage] = useState(false)
     const [name,setName]=useState();
     const [email,setEmail]=useState();
     console.log(loginPage,"Loginpage")

      useEffect(() => {
            function getToken(){
               axios.get("http://localhost:5000/api/users/me",{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
               })
               .then((res)=>{
                   console.log(res.data.name)
                   console.log(res.data.email)
                   setName(res.data.name)
                   setEmail(res.data.email)

               }).catch(er=>{
                   console.log("UnAuthorized",er)
               })
           }
           getToken();
      }, [])


     if(loginPage){
         window.location.reload(true)
        return <Loginuser/>
     }

    return (
        <div className="userDetail">
            <div >
               <p style={{textAlign:"center"}}>UserName:{name}</p> 
            </div>
            <div>
            <p style={{textAlign:"center"}}>Email:{email}</p>
            </div>
                <div>
                    <button className="logoutbtn" onClick={()=>{
                        localStorage.removeItem("token")
                        setLoginpage(true)
                    }} >Logout</button>
                </div>
        </div>
    )
}
