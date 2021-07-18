import axios from "axios"
export const GET_POST = "get/post/user"
export const GET_DATA = "get/data/user"
export const UPDATE_DATA="get/update/user"
export const GET_DATA_CLIENT = "get/data/client"
export const GET_PRODUCT_CLIENT = "get/produit/client"
export const GET_ID_DATA = "get/id/data"
require('dotenv').config({path: '../../../'})
export const getData = (id) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      withCredentials: true,
      url:`http://localhost:9000'/api/` + id,
    }).then(user => {
      dispatch({ type: GET_DATA, payload: user.data })
    }) .catch(err => {
      console.log(err)
    })
  }
}
export const getPost = (id) => {
  return async (dispatch) => {
    axios({
      method: 'get',
      withCredentials: true,
      url: `http://localhost:9000'/api/get/` + id,
    })
      .then(user => {
        dispatch({ type: GET_POST, payload: user.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const update= (id) => {
  return async dispatch => {
    await axios({
      method: "get",
      withCredentials: true,
      url: `http://localhost:9000'/api/update/`+id,
    }).then(user => {
      dispatch({type: UPDATE_DATA, payload: user.data})
    })
      .catch(err => {
        console.log(err)
      })
  }
}


export const getDataClient=()=>{
  return async dispatch => {
    await axios({
      method: "get",
      withCredentials: true,
      url: `http://localhost:9000'/api/alluser`,
    }).then(user => {
      dispatch({type: GET_DATA_CLIENT, payload: user.data})
    })
      .catch(err => {
        console.log(err)
      })
  }
}

export const getProduitsForClient=() => {
  return dispatch => {
    axios({ 
      method:"get",
      url: `http://localhost:9000'/api/produitclient`,
      withCredentials: true,
    }).then((user) => {
      dispatch({type:GET_PRODUCT_CLIENT , payload:user.data})
    }).catch((err) => {
      console.log(err)
    })
  }
}

export const getId = ()=>{
  return dispatch =>{
    axios({
      method:"get",
      withCredentials: true,
      url:`http://localhost:9000'/api/one`,
    })
    .then((user)=>{
      dispatch({type:GET_ID_DATA, payload: user.data})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}