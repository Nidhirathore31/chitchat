import React, { useRef, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { IoEllipsisVertical } from "react-icons/io5";
import SendMessage from "./SendMessage";


const Message = ({ message, handleEdit }) => {
  const [user] = useAuthState(auth);
  const [showOptions, setShowOptions] = useState(false);
  const scroll = useRef();

  const toggleOptions = () => {
         setShowOptions((prevState) => !prevState);
      };
  const handleDelete = async (id) => {
    const taskDocRef = doc(db, 'messages', id)
    try {
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
    console.log("deleted",id)
  }
  
  return (
    <>
    <div
      className={` w-[50vw]  flex items-start  mb-4 mt-10 ${message.uid === user.uid ? "justify-end" : ""}`}
    >
      <img
        className="w-10 h-10 rounded-full object-cover mr-3"
        src={message.avatar}
        alt="user avatar"
      />
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          message.uid === user.uid
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <div className="flex gap-2 "><p className={`font-semibold ${message.uid === user.uid ? "text-white " : "text-gray-800"}`}>
          {message.name}
        </p>
        <IoEllipsisVertical onClick={toggleOptions}/></div>
      {showOptions && (
         <div>
          <p
         className="text-gray-800"
       onClick={() => {
            handleDelete(message.id);
            setShowOptions(false); 
          }}
       >
          DELETE
       </p>
       <p  className="text-gray-800"   onClick={() => handleEdit(message)}>EDIT</p>
         </div>
    )}
     <p className="text-sm">{message.text}</p>
      </div>
      
    </div>
    {/* <span ref={scroll}></span>
            <SendMessage scroll={scroll} /> */}
    </>
    
  );
};

export default Message;