import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../App.css"
import { getDataClient } from '../redux/actions/actions'
import { NavLink} from "react-router-dom"
require('dotenv').config()

function NavBar() {
    return (
        <nav className="navbar navbar-light bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand text-light mx-4">Navbar</a>
                <form className="d-flex mx-4">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}
function Cards() {

    const state = useSelector(state => state.getDataForClient)
    const setId=(id) => {
        axios({
            method:"post",
            withCredentials:true,
            url:`http://localhost:9000'/api/set`,
            data: {
                id: id,
            }
        }).then(user=>{console.log(user)})
            .catch(err =>{
                console.log(err)
            })
    }
  
    const cards=state.map((card, key) => {
        if(card){      
            return(

            <div>
            <div class="card" key={key} >
            <h5 class="card-header center card-title">{card.entreprise}</h5>
            <div class="div-card-img">
            <img src={card.picture} class="card-img-top rounded-circle card-img" alt="..." />
            <h5 class="card-title mt-2">{" "+card.username}</h5>
            </div>
            <div class="card-footer">
            <p class="card-text"><i class="fas fa-map-marker-alt"></i>{" "+card.pays + "-" + card.ville + "-" + card.address}</p>

            <button type="button" class="btn btn-secondary mx-2" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="left" data-bs-content="Left popover">
                 Maps
            </button>

            <NavLink to="/produits" class="btn btn-primary" onClick={()=>setId(card._id)}>Prendre RV</NavLink>
            </div>
            </div>
            </div>
            )
        }
        
    })

    return (
        <div className="flex-card mt-4 pt-4">
            {cards}
        </div>
    )
}

export default function AutClient() {
    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(getDataClient())
    }, [])
    return (
        <div>
            <NavBar />
            <Cards />
        </div>
    )
}
