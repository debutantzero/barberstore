import { GET_ID_DATA } from "../actions/actions"

const initialState={}

export const getIdProduit=(state=initialState, action)=>{
    switch (action.type){
        case GET_ID_DATA :
            return action.payload
        default :
            return state
    }
}