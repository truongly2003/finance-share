import httpRequest from "@/utils/httpRequest";
export const getAllCategory=async(userId)=>{
    try {
        const response = await httpRequest.get(`/finance-service/category?userId=${userId}`);
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const getAllCategoriesInAddTransaction=async(userId)=>{
    try {
        const response = await httpRequest.get(`/finance-service/category/getAllCategoryInAddTransaction?userId=${userId}`);
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const getCategoryById=async(categoryId)=>{
    try {
        const response = await httpRequest.get(`/finance-service/category/category-detail?categoryId=${categoryId}`);
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const addCategory=async (data) => {
    try {
        const response = await httpRequest.post("/finance-service/category",data)
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const updateCategory=async (id,userId,data) => {
    try {
        const response = await httpRequest.put(`/finance-service/category?userId=${userId}&categoryId=${id}`,data)
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const deleteCategory=async (id,userId) => {
    try {
        const response = await httpRequest.delete(`/finance-service/category?categoryId=${id}&userId=${userId}`)
        return response.data
    } catch (error) {
        console.error(error);
    }
}