import {http} from "@/utils/request.js";
//添加到购物车
export const addToCartAPI = (data) => {
    return http({
        method: 'POST',
        url: '/machine/shoppingCart',
        data
    })
}
//获取购物车详情
export const getCartInfoAPI = (shopId) => {
    return http({
        method: 'GET',
        url: `/machine/shoppingCart?shopId=${shopId}`
    })
}
//相同菜品加一
export const addOneAPI = (shopCartId) => {
    return http({
        method: 'POST',
        url: `/machine/shoppingCart/addOne?shopCartId=${shopCartId}`
    })
}
//相同菜品减少一
export const deleteOneAPI = (shopCartId) => {
    return http({
        method: 'POST',
        url: `/machine/shoppingCart/deleteOne?shopCartId=${shopCartId}`
    })
}
//清空购物车
export const clearCartAllAPI = (shopId) => {
    return http({
        method: 'DELETE',
        url: `/machine/shoppingCart/clearAll?shopId=${shopId}`
    })
}