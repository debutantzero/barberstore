import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getId, getProduitsForClient } from '../redux/actions/actions'

function NavBar() {
    return (
        <nav className="navbar navbar-light bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand text-light mx-4">Barber-shop</a>
                <form className="d-flex mx-4">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}
function CardsProduits() {
    const [valueOption, setValueOption]= useState("10:00")
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    console.log(typeof(state.getIdProduit))
    const [key, setKey] = useState("")
    const setIdcookie = (id) => {
        console.log(id)
        axios({
            method: "post",
            withCredentials: true,
            url: `http://localhost:9000'/api/set/produit`,
            data: {
                id
            }
        }).then((user) => {
            return user
        })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        dispatch(getId())
    }, [key])

    const sendMail = (picture, prix, email ,name ) => {
          try {
              axios({
                  method: 'POST',
                  url: `http://localhost:9000'/mail/send`,
                  withCredentials: true,
                  data: {
                      prix, picture,heure:valueOption, email,name,
                    }
                }).then(user => {
                    console.log("send")
                }).catch(err => console.log(err))
            } catch (error) {
                console.log(error)
            }  
    }
    const [sended, setsended]= useState(true)
    const [nameClien, setNameClien]= useState("")

    const card = state.getProduct.map((user, key) => {
        if (user) {
            return (
                <div key={key} className="card">
                    <div className="card-header">
                        <h5 className="card-title bg-primary number text-light">{key}</h5>
                    </div>
                    <div className="card-body card-body-img">
                        <img src={user.picture} className="pr_img" />

                    </div>
                    <div className="card-footer footer-img">
                        <h6>Prix : {user.prix}</h6>
                        <button onClick={() => { setIdcookie(user._id); setKey(key) }} className="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <i className="fas fa-cart-plus"></i>
                        </button>
                    </div>
                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h5 id="offcanvasRightLabel">Envoyer le RV</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <div className="offcanvas-body ">
                            <div className="card card-body">
                                <img src={state.getIdProduit && state.getIdProduit.picture} className="pr_img_rv" />
                                <div>
                                    <label className="mt-3 mb-3 form-label">Prix : {state.getIdProduit && state.getIdProduit.prix}</label>
                                <div className="flex-simple">
                                </div>
                                <label className="form-label">Heure</label>
                                    <select className="form-select" 
                                    aria-label="Default select example" 
                                    value={valueOption} onChange={(e)=>setValueOption(e.target.value)}>
                                        <option value="10:00" selected>10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                      
                                    </select>
                                </div>
                                <div>
                                <label className="form-label">Votre nom</label>
                                <input value={nameClien} onChange={(e)=>setNameClien(e.target.value)} type="text" className="form-control mb-3" placeholder="votre nom ..."/>
                                </div>
                                </div>
                        </div>
                        <div className="offcanvas-footer center mb-4">
                            <button className="edit"
                                onClick={async() => {
                                    if(typeof(state.getDataForClient[0])==="object"){
                                        await sendMail(state.getIdProduit.picture,
                                                  state.getIdProduit.prix,
                                                  state.getDataForClient[0].email,
                                                  nameClien
                                                  )
                                         setsended(!sended)   
                                    }else{
                                        console.log("error")
                                    }
                                }}>
                                    {sended ?
                                    (<i className="fas fa-paper-plane"> Envoyer</i>) :
                                    <i class="far fa-check-circle"></i>}
                                 </button>
                        </div>
                    </div>
                </div>
            )
        }
    })


    return (
        <div className="flex-card">
            {card}

        </div>
    )
}

export default function Produits() {
    const dispatch = useDispatch()
    useEffect(async () => {
        await dispatch(getProduitsForClient())
    }, [])
    return (
        <div>
            <NavBar />
            <CardsProduits />
        </div>
    )
}
