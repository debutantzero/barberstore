import {GET_DATA, UPDATE_DATA} from '../actions/actions'

const initialState ={}

export const getUser =(state=initialState, action)=>{
  switch(action.type){
    case GET_DATA:
      return action.payload
    case UPDATE_DATA:
      return action.payload
    default:
      return state
  }
}