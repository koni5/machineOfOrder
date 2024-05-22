import {http} from "@/utils/request.js";
//添加到购物车
export const addToCartAPI=(data)=>{
    return http({
        method:'POST',
        url:'/machine/shoppingCart',
        data
    })
}
export const getCartInfoAPI=(shopId)=>{
    return http({
        method:'GET',
        url:`/machine/shoppingCart?shopId=${shopId}`
    })
}