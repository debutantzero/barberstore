import { combineReducers } from "redux";
import {getUser} from "./recuders/user.data"
import {getPost} from "./recuders/post.data"
import { getDataForClient } from "./recuders/client.get.data";
import { getProduct } from "./recuders/produits.client";
import { getIdProduit } from "./recuders/get.id.produit";
export const rootReducer = combineReducers({
    getUser,
    getPost,
    getDataForClient,
    getProduct,
    getIdProduit,
})