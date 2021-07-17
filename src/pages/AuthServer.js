import React from 'react'
import { useState } from 'react'
import serImg from "../images/server_img.png"
import axios from "axios"
import {getId} from "../index"
import { useDispatch } from 'react-redux'
require('dotenv').config({path: '../../'})
const Register = ({setAuth}) => {
    
    const [entreprise, setentreprise]=useState("")
    const [username, setusername]=useState("")
    const [password, setpassword]=useState("")
    const [rpassword, setRpassword]=useState("")
    const [email, setemail]=useState("")
    const handleSubmit = (e)=> {
        e.preventDefault();
        axios({
            method: "post",
            withCredentials:true,
            url: `${process.env.REACT_APP_PORT}/api/register`,
            data: {
                username,
                entreprise,
                password,
                email
            }
        }).then(data => {
            console.log(data)
            setAuth(false)
        })
    }
    return (
        <div className="server-container">
            <div className="server-container-left container">
                <img className="server-img" src={serImg} />
            </div>
            <div className="server-container-right">
                <form className="container server-form" onSubmit={handleSubmit}>
                    <h3 className="server-h3 mb-3 text-primary">INSCRIPTION</h3>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Nom de votre entreprise</label>
                        <input type="text" className="form-control" required value={entreprise} onChange={(e)=>setentreprise(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Votre Nom</label>
                        <input type="text" className="form-control" required value={username} onChange={(e)=>setusername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" required value={email} onChange={(e)=>setemail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                        <input type="password" className="form-control" required  value={password} onChange={(e)=>setpassword(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                        <input type="password" className="form-control" required value={rpassword} onChange={(e)=>setRpassword(e.target.value)} />
                    </div>
                    <div className="mb-3">

                        <button className="form-control btn-primary text-light" >S'inscrire</button>
                    </div>
                    <div className="mb-3">
                        <button className="form-control btn-outline-primary " onClick={()=>setAuth(false)} >Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
const Login = ({setAuth}) => {
 
    const [username, setusername]=useState("")
    const [password, setpassword]=useState("")

    const [errorUsername, setErrorUsername]= useState()
    const [errorPassword, setErrorPassword]= useState()

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios({
            method: 'POST',
            url:`${process.env.REACT_APP_PORT}/api/login`,
            withCredentials:true,
            data: {
                username, password
            }
        }).then((data) => {
            if(data.data==="username incorrect"){
                setErrorUsername("username inconnu")
                setErrorPassword("")
            }
            if(data.data==="password incorrect"){

                setErrorUsername("")
                setErrorPassword("password incorrect")
            }
        
            if(data.data._id)
                window.location="/shop"
        }).catch((err) => console.log(err))
    }
    return (
        <div className="server-container">
            <div className="server-container-left container">
                <img className="server-img" src={serImg} />
            </div>
            <div className="server-container-right">
                <form className="container server-form" onSubmit={handleSubmit}>
                    <h3 className="server-h3 mb-3 text-primary">CONNECTION</h3>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Votre nom</label>
                        <input type="text" className="form-control" required value={username} onChange={(e)=>setusername(e.target.value)}/>
                        <div className="text-danger">{errorUsername}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                        <input type="password" className="form-control" required value={password} onChange={(e)=>setpassword(e.target.value)} />
                        <div className="text-danger">{errorPassword}</div>
                    </div>
                    <div className="mb-3">

                        <button className="form-control btn-primary text-light" >Se connecter</button>
                    </div>
                    <div className="mb-3">

                        <button className="form-control btn-outline-primary " onClick={()=>setAuth(true)}>S'inscrire</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default function AuthServer() {
    const [aut, setAuth] = useState(true)
    return (
        <div>
            {aut ?
                (<div>
                  
                    <Register setAuth={setAuth}/>
                </div>) :
                (
                <div>
                    <Login setAuth={setAuth}/>   
                </div>
                )
            }
        </div>
    )
}
