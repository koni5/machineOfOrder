import {http} from "@/utils/request.js";
export const addToCartAPI=(data)=>{
    return http({
        method:'POST',
        url:'/machine/shoppingCart',
        data
    })
}