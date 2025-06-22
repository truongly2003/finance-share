import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
const socket = new Client({
  webSocketFactory: () => new SockJS("http://localhost:8082/ws"),
  debug: (str) => {
    console.log(str);
  },
  reconnectDelay: 5000,
  onConnect: () => {
    console.log("Connected");
  },
  onStompError: (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Details: " + frame.body);
  },
});
export default socket