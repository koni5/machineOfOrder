import {http} from "@/utils/request.js";
//获取菜品分类信息
export const getCategoryAPI = () => {
    return http({
        method: 'GET',
        url: '/machine/category/list'
    })
}
//获取菜品信息
export const getDishAPI = (categoryId) => {
    return http({
        method: 'GET',
        url: `/machine/dish/list?categoryId=${categoryId}`
    })
}