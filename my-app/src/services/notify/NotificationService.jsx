import httpRequest from "@/utils/httpRequest";
const notificationApi = {
  getAllNotificationByUserId: async(userId)=>{
    try {
      const response =await httpRequest.get(`/notification-service/notifications?userId=${userId}`)
      return response.data
    } catch (error) {
      console.log(error)
       throw error;
    }
  },
  markReadNotification: async (userId)=>{
    return userId
  },
  markReadNotificationDetail:async(userId)=>{
    return userId
  }
};
// export const getAllNotificationByUserId = async (id) => {
//   try {
//     const response = await httpRequest.get(`/notify?userId=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
// export const markReadNotification = async (id) => {
//   try {
//     const response = await httpRequest.post(`/notify/mark-as-read?userId=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const markReadNotificationDetail = async (id) => {
//   try {
//     const response = await httpRequest.post(`/notify/mark-as-read/detail?id=${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export { notificationApi };
