import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import uuid from "uuid/v4";

const myId = uuid();
const socket = io("http://localhost:3005");
socket.on("connect", () =>
  console.log("[IO] Connect => A Conexão foi estabelida")
);

const Chat = () => {
  const [message, setMessage] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [autor, setAutor] = useState("");

  useEffect(() => {
    const handleMessage = (newMessage) =>
      setMensagens([...mensagens, newMessage]);
    socket.on("chat.message", handleMessage);

    return () => socket.off("chat.message", handleMessage);
  }, [mensagens]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (message.trim()) {
      socket.emit("chat.message", {
        id: myId,
        message,
        autor,
      });
      setMessage("");
    }
  };

  return (
    <>
      <main className="container">
        <div>
          <form>
          <input
            type="text"
            placeholder="Digite seu Nome"
            onChange={(e) => setAutor(e.target.value)}
            value={autor}
          />
            
          </form>
        </div>
        <div className="messages">
          <ol>
            {mensagens.map((m, index) => (
              <li
                key={index}
                className={`message ${m.id === myId ? "myMsg" : "outherMsg"}`}
              >
                <small>{m.autor}</small>
                <p>{m.message}</p>
              </li>
            ))}
          </ol>
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Digite sua mensagem"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </form>
      </main>
    </>
  );
};

export default Chat;
