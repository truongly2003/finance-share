import httpRequest from "@/utils/httpRequest";
export const getAllCategory=async(userId)=>{
    try {
        const response = await httpRequest.get(`/category?userId=${userId}`);
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const getCategoryById=async(categoryId)=>{
    try {
        const response = await httpRequest.get(`/category/category-detail?categoryId=${categoryId}`);
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const addCategory=async (data) => {
    try {
        const response = await httpRequest.post("/category",data)
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const updateCategory=async (id,userId,data) => {
    try {
        const response = await httpRequest.put(`/category?userId=${userId}&categoryId=${id}`,data)
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export const deleteCategory=async (id,userId) => {
    try {
        const response = await httpRequest.delete(`/category?categoryId=${id}&userId=${userId}`)
        return response.data
    } catch (error) {
        console.error(error);
    }
}