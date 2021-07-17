import {GET_POST} from '../actions/actions'

const initialState =[]

export const getPost =(state=initialState, action)=>{
  switch(action.type){
    case GET_POST:
      return action.payload
    default:
      return state
  }
}