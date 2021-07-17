import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../App.css"
import { getData, getPost, update } from '../redux/actions/actions'
require('dotenv').config({path: '../../'})
function Render(){
    const [produit, setproduit] = useState()
    const [prix, setPrix] = useState("")
    const [file, setfile] = useState("")
    const [verified, setverified] = useState("");
    const [changePrix, setChangePrix] = useState("")
    const [newPrix, setNewPrix] = useState("")
    const [sendId, setSendId] = useState("")
    const dispatch = useDispatch()
    const selectors = useSelector(state => state)

    const [renderUpdate, setRenderUpdate] = useState(false)
    ////////////////////////////////settings////////////////////////////////////////////
    const [entreprise, setEntreprise] = useState("")
    const [username, setUsername] = useState("")
    const [pays, setPays] = useState("")
    const [ville, setVille] = useState("")
    const [address, setAddress] = useState("")
    const [settings, setSettings] = useState("")
    const [profilFile, setProfilFile] = useState("")
    const updateData = (data) => {
        if (username !== "") {
            axios({
                method: "patch",
                withCredentials: true,
                data: { username: data },
                url: `${process.env.REACT_APP_PORT}/api/update/username`,
            }).then((user) => {
                setSettings(user.data);
                setUsername("")

            }).catch((err) => {
                console.log(err)
            })
        }
        if (entreprise !== "") {
            axios({
                method: "patch",
                withCredentials: true,
                data: { entreprise: data },
                url: `${process.env.REACT_APP_PORT}/api/update/entreprise`,
            }).then((user) => {
                setSettings(user.data);
                setEntreprise("")
            }).catch((err) => {
                console.log(err)
            })
        }
        if (pays !== "") {
            axios({
                method: "patch",
                withCredentials: true,
                data: { pays: data },
                url: `${process.env.REACT_APP_PORT}/api/update/pays`,
            }).then((user) => {
                setSettings(user.data);
                setPays("")
            }).catch((err) => {
                console.log(err)
            })
        }
        if (ville !== "") {
            axios({
                method: "patch",
                withCredentials: true,
                data: { ville: data },
                url: `${process.env.REACT_APP_PORT}/api/update/ville`,
            }).then((user) => {
                setSettings(user.data);
                setVille("")

            }).catch((err) => {
                console.log(err)
            })
        }
        if (address !== "") {
            axios({
                method: "patch",
                withCredentials: true,
                data: { address: data },
                url: `${process.env.REACT_APP_PORT}/api/update/address`,
            }).then((user) => {
                setSettings(user.data);
                setAddress("")

            }).catch((err) => {
                console.log(err)
            })
        }
        if (ville !== "") {
            axios({
                method: "patch",
                withCredentials: true,
                data: { ville: data },
                url: `${process.env.REACT_APP_PORT}/api/update/ville`,
            }).then((user) => {
                setSettings(user.data);
                setVille("")

            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const updateImage = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", profilFile);
        axios({
            method: "patch",
            withCredentials: true,
            data: data,
            url: `${process.env.REACT_APP_PORT}/api/profil`,
        }).then((user) => {
            setSettings(user.data);

        }).catch((err) => {
            console.log(err)
        })

    }
    ///////////////////////// end settings /////////////////////////////////////////////
    ///////////////////////// logout /////////////////////////////
    const logout = () => {
        axios({
            method:"get",
            withCredentials: true,
            url:`${process.env.REACT_APP_PORT}/api/logout`,
        }).then((user) => {
            if(user)
            window.location="/"
        }).catch((err) => {
            console.log(err)
        })
    }
    //////////////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(file)
        const data = new FormData();
        data.append("prix", prix)
        data.append("file", file)
        await axios({
            method: "post",
            withCredentials: true,
            data: data,
            url: `${process.env.REACT_APP_PORT}/api/post`,
        }).then((user) => {
            setproduit(user);

        }).catch((err) => {
            console.log(err)
        })
    }
    const removePost = (id) => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_PORT}/api/delete/` + id,
            withCredentials: true,
        })
            .then((response) => {
                setverified(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //////////////////////////////////////////////////////////////////
    const handlePrix = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            data: {
                prix: newPrix
            },
            url: `${process.env.REACT_APP_PORT}/api/new/` + sendId,
            withCredentials: true,
        }).then((user) => {
            setChangePrix(user)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(async () => {
        await dispatch(update(selectors.getUser._id));
    }, [settings])

    useEffect(async () => {
        await dispatch(getPost(selectors.getUser._id));
    }, [produit, verified, changePrix, settings])

    const datas = selectors.getPost.map((data, key) =>
        <div key={key} className="card">
            <div className="card-header">

                <button className="edit" onClick={() => removePost(data._id)}>
                    <i className="fas fa-trash-alt" ></i>
                </button>

            </div>
            <div className="card-body card-body-img">
                <img src={data.picture} className="pr_img" />
            </div>
            <div className="card-footer footer-img">
                <h6>Prix : {data.prix}</h6>

            </div>

            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" value={sendId} onClick={() => setSendId(data._id)}>Modifier le Prix</button>

            <div className="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasTopLabel">Modifier le Prix</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handlePrix}>
                        <input type="number" className="form-control" value={newPrix} onChange={e => setNewPrix(e.target.value)} /><br></br>
                        <button type="submit" className="btn btn-primary form-control">Modifier</button>
                    </form>
                </div>
            </div>

        </div>
    )
    
    
    return (
        <div className="shop-container">
        <div className="shop-container-header bg-primary">
            <div className="container flex">
                <div className="">
                    <h3 className="text-light p-2">{selectors.getUser.entreprise}</h3>
                </div>
                <div className="img-profil-body">
                    <button className="edit" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                        {selectors.getUser.picture ? <img src={selectors.getUser.picture} className="rounded-circle img-profil" alt="..." /> :
                            <h2>{selectors.getUser.username && selectors.getUser.username.slice(0,2)}</h2>}
                    </button>
                </div>
            </div>
        </div>
        <div className="shop-container-body m-4">

            <div className="">
                <button className="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Ajouter un nouveau produit</button>

                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Ajouter vos produits</h5>
                        <button type="button" className="btn-close  text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body center">
                        <div className="card" >

                            <form className="card-body" onSubmit={handleSubmit}>
                                <label className="mb-4">Ajouter une image</label>
                                <input type="file" className="form-control mb-2 text-primary" onChange={e => setfile(e.target.files[0])} />
                                <label className="mt-2 mb-3">Prix</label>
                                <input type="number" className="form-control mb-4" value={prix} onChange={(e) => setPrix(e.target.value)} />
                                <input type="submit" className="form-control btn-primary" value="Valider" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div>

                <div className="my_card" >
                    {datas}
                </div>

                <div className="settings">
                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div className="offcanvas-header">
                            <img className="update-img" src={selectors.getUser.picture}/>
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Mettre a jour vos données</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        {renderUpdate ?
                            <div className="offcanvas-body">

                                <label>Nom de votre boutique : <span className="text-primary">{selectors.getUser.entreprise}</span> </label>
                                <input type="text" className="form-control mb-1" placeholder="Mettre à jour ..."
                                    value={entreprise} onChange={(e) => setEntreprise(e.target.value)} />
                                <button className="btn btn-secondary mb-2" onClick={() => updateData(entreprise)}>Modifier</button> <br></br>

                                <label>Nom d'utilisation : <span className="text-primary">{selectors.getUser.username}</span></label>
                                <input type="text" className="form-control mb-1" placeholder="Mettre à jour ..."
                                    value={username} onChange={(e) => setUsername(e.target.value)}
                                />
                                <button className="btn btn-secondary mb-2" onClick={() => updateData(username)}>Modifier</button> <br></br>

                                <label>Pays : <span className="text-primary">{selectors.getUser.pays}</span></label>
                                <input type="text" className="form-control mb-1" placeholder="Mettre à jour ..."
                                    value={pays} onChange={(e) => setPays(e.target.value)}
                                />
                                <button className="btn btn-secondary mb-2" onClick={() => updateData(pays)}>Modifier</button> <br></br>

                                <label>ville : <span className="text-primary">{selectors.getUser.ville}</span></label>
                                <input type="text" className="form-control mb-1" placeholder="Mettre à jour ..."
                                    value={ville} onChange={(e) => setVille(e.target.value)}
                                />
                                <button className="btn btn-secondary mb-2" onClick={() => updateData(ville)}>Modifier</button> <br></br>

                                <label>address : <span className="text-primary">{selectors.getUser.address}</span></label>
                                <input type="text" className="form-control mb-1" placeholder="Mettre à jour ..."
                                    value={address} onChange={(e) => setAddress(e.target.value)}
                                />
                                <button className="btn btn-secondary mb-2" onClick={() => updateData(address)}>Modifier</button> <br></br>

                                <form onSubmit={updateImage}>
                                    <label>photo profile</label>
                                    <input type="file" className="form-control mb-2" name="file" onChange={(e) => setProfilFile(e.target.files[0])} />
                                    <input type="submit" className=" btn btn-secondary" value="Modifier" />
                                </form>
                                <button className="btn btn-primary mt-4" onClick={()=>setRenderUpdate(!renderUpdate)}>Sauvegarder</button>
                            </div> :
                            <div className="offcanvas-body">
                                <ul class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                       Boutique
                                        <span class="badge px-4 pt-2 pb-2 bg-primary">{selectors.getUser.entreprise}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Nom d'utilisation
                                        <span class="badge bg-primary px-4 pt-2 pb-2">{selectors.getUser.username}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Email
                                        <span class="badge bg-primary px-4 pt-2 pb-2">{selectors.getUser.email}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Pays
                                        <span class="badge bg-primary px-4 pt-2 pb-2">{selectors.getUser.pays}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Ville
                                        <span class="badge bg-primary px-4 pt-2 pb-2">{selectors.getUser.ville}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Address
                                        <span class="badge bg-primary px-4 pt-2 pb-2">{selectors.getUser.address}</span>
                                    </li>
                                    <button className="btn btn-primary" onClick={()=>setRenderUpdate(!renderUpdate)}>Mise à jour ...</button>
                                </ul>
                            </div>

                        }

                        <div offcanvas-footer>
                            <button className="btn btn-default form-control" onClick={logout}>Deconnexion</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}






export default function Shop() {
  const selectors= useSelector(state=>state)

  return (  
      <Render/> 
    )
}
