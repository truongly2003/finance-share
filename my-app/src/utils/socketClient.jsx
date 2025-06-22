// // src/services/websocket/websocketService.js
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

// const websocketService = {
//   stompClient: null,
//   connected: false,
//   subscriptions: new Map(),

//   // Kết nối WebSocket
//   connect() {
//     return new Promise((resolve, reject) => {
//       const socket = new SockJS('http://localhost:8080/ws');
//       this.stompClient = new Client({
//         webSocketFactory: () => socket,
//         reconnectDelay: 5000,
//         debug: (str) => console.log(str),
//       });

//       this.stompClient.onConnect = (frame) => {
//         this.connected = true;
//         console.log('WebSocket connected:', frame);
//         resolve();
//       };

//       this.stompClient.onStompError = (error) => {
//         console.error('WebSocket error:', error);
//         this.connected = false;
//         reject(error);
//       };

//       this.stompClient.activate();
//     });
//   },

//   // Đăng ký nhận tin nhắn từ một topic
//   subscribe(topic, callback) {
//     if (!this.connected || !this.stompClient) {
//       console.error('WebSocket not connected');
//       return null;
//     }
//     const subscription = this.stompClient.subscribe(topic, (message) => {
//       try {
//         const data = JSON.parse(message.body);
//         callback(data);
//       } catch (error) {
//         console.error('Error parsing message:', error);
//       }
//     });
//     this.subscriptions.set(topic, subscription);
//     return subscription;
//   },

//   // Hủy đăng ký
//   unsubscribe(topic) {
//     const subscription = this.subscriptions.get(topic);
//     if (subscription) {
//       subscription.unsubscribe();
//       this.subscriptions.delete(topic);
//     }
//   },

//   // Ngắt kết nối
//   disconnect() {
//     if (this.stompClient) {
//       this.stompClient.deactivate();
//       this.connected = false;
//       this.subscriptions.clear();
//       console.log('WebSocket disconnected');
//     }
//   },

//   isConnected() {
//     return this.connected;
//   },
// };

// export default websocketService;