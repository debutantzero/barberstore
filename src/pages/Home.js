import React from 'react'
import "../App.css"
import homeImage from '../images/home_img.svg'
import { NavLink } from 'react-router-dom'

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-container-left">
                <img className="home-image" src={homeImage} />
            </div>

            <div className="home-container-right">
                <div className="d-grid gap-2 col-6 mx-auto">
                    <NavLink to="/server" className="btn btn-primary text-light" type="button">je suis un coiffeur</NavLink>
                    <NavLink to="/client" className="btn btn-outline-primary" type="button">je veux me coiffer</NavLink>
                </div>
            </div>
        </div>
    )
}
