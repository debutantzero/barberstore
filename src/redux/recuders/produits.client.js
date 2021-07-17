import {GET_PRODUCT_CLIENT} from "../actions/actions"
const initialState=[]

export const getProduct=(state=initialState, action) =>{
    switch (action.type) {
        case GET_PRODUCT_CLIENT:
            return action.payload
        default:
            return state
    }
}