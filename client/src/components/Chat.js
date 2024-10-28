import { w3cwebsocket as Socket } from "websocket";
import { useState } from "react";

const client = new Socket("ws://172.29.64.1:8000"); // 8000 - port that server is listening to

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
