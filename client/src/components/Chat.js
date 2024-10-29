import { w3cwebsocket as Socket } from "websocket";
import { useState, useEffect } from "react";

const client = new Socket("ws://172.26.144.1:8000"); // 8000 - port that server is listening to

const Chat = ({ userName }) => {
  const [myMessage, setMyMessage] = useState("");

  const onSend = () => {
    client.send(
      JSON.stringify({
        type: "message",
        message: myMessage,
        userName,
      })
    );
    setMyMessage("");
  };

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      // Handle incoming messages here
      console.log("Received message:", message.data);
    };
    client.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
    client.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };

    // Cleanup on component unmount
    return () => {
      client.close();
    };
  }, []);

  return (
    <>
      <div className="title">Socket Chat: {userName}</div>
      <div className="bottom form">
        <input
          type="myMessage"
          value={myMessage}
          onChange={(e) => setMyMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && onSend()}
          placeholder="Message"
        ></input>
        <button onClick={onSend}>Send</button>
      </div>
    </>
  );
};
export default Chat;
