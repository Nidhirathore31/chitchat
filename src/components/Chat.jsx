import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [editMsg,setEditMsg] = useState(null)
 
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);
const handleEdit = (data)=>{
  setEditMsg(data)
 
}
console.log(editMsg,"dsassa")
  return (
    <main className="flex flex-col h-screen bg-gray-100">
    {/* Chat messages container */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.map((message) => (
        <Message key={message.id} message={message} handleEdit={handleEdit} />
      ))}
      {/* Scroll reference */}
      <span ref={scroll} />
   
  
    {/* Send message input area */}
    <div className="p-4 shadow-md border-t">
      <SendMessage scroll={scroll} editMsg={editMsg} setEditMsg={setEditMsg} />
    </div> </div>
  </main>
  
  );
};
export default Chat;