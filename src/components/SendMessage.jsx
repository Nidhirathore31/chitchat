import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { VscSend } from "react-icons/vsc";

const SendMessage = ({ scroll,editMsg ,setEditMsg}) => {
    const [message, setMessage] = useState("");
    useEffect(()=>{
      if(editMsg){
        setMessage(editMsg?.text)
      }
    },[editMsg])

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
          alert("Enter valid message");
          return;
        }
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
          text: message,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
        });
        setMessage("");
        scroll.current.scrollIntoView({ behavior: "smooth" })
      };
      const handleEdit = async (id) => {
        const taskDocRef = doc(db, 'messages', id);
        try {
          await updateDoc(taskDocRef, {
            text: message,
           
          });
          setEditMsg(null);
          setMessage("");
        } catch (err) {
          alert(err);
        }
      }
  return (
    <>
    <form
  onSubmit={(e) => {
    e.preventDefault();
    if (!editMsg) {
      sendMessage(e);
    } else {
      handleEdit(editMsg?.id);
    }
  }}
  className="flex items-center space-x-3 p-4 rounded-lg shadow-lg max-w-xl mx-auto"
>
  <label htmlFor="messageInput" hidden>
    Enter Message
  </label>
  <input
    id="messageInput"
    name="messageInput"
    type="text"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="flex-1 p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Type a message..."
  />
  <button
    type="submit"
    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <VscSend className="w-5 h-5" />
  </button>
</form>

    </>
  );
};
export default SendMessage;