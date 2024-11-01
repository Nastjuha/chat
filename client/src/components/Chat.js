import { w3cwebsocket as Socket } from "websocket";
import { useState, useEffect } from "react";

const client = new Socket("ws://172.29.64.1:8000"); // 8000 - port that server is listening to

const Chat = ({ userName }) => {
  const [myMessage, setMyMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
      //console.log("Received message:", message.data);
      const data = JSON.parse(message.data);
      // we need messages data state for saving data from received message above
      // {"type":"message","message":"huhuh","userName":"2nd user"}

      // adding current message to the list we have
      setMessages((message) => [
        ...messages,
        {
          message: data.message,
          userName: data.userName,
        },
      ]);
    };
    client.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
    client.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };

    // Cleanup on component unmount
    // return () => {
    //   client.close();
    // };
  }, [messages]);

  return (
    <>
      <div className="title">Socket Chat: {userName}</div>
      <div className="messages">
        {messages.map((message, key) => (
          <div
            key={key}
            className={`message ${
              userName === message.userName ? "flex-end" : "flex-start" // if the userName in local is the same as user, that provided a message now (message.userName)
            }`}
          >
            <section>{message.userName[0].toUpperCase()}</section>
            <h4>{message.userName + ":"}</h4>
            <p>{message.message}</p>
          </div>
        ))}
      </div>

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
