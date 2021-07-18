import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import AuthClient from './pages/AutClient'
import AuthServer from './pages/AuthServer';
import Shop from './pages/Shop';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getData } from './redux/actions/actions';
import Produits from './pages/Produits';
require('dotenv').config()
function App() {
 const dispatch=useDispatch() 
const [id , setId]=useState()
  useEffect(async ()=> {
    await axios({
      method:"get",
      url: `http://localhost:9000'/myid`,
      withCredentials:true,
    }).then((user)=> 
    {
      setId(user.data);
    }).catch((err)=>{
      console.log(err)
    })
    if(id){
      dispatch(getData(id))
    }
  },[id])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/client" component={AuthClient} />
        <Route path="/server" component={AuthServer} />
        <Route path="/shop" component={Shop} />
        <Route path="/produits" component={Produits} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
