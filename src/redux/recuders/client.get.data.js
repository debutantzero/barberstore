import { GET_DATA_CLIENT } from '../actions/actions.js'
const initialState=[]

export const getDataForClient = (state=initialState, action) =>{
    switch(action.type){
        case GET_DATA_CLIENT:
            return action.payload
        default:
            return state
    }
}