import React, { useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

const NavBar = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="flex justify-between items-center p-4 bg-slate-700 text-white shadow-md w-[100vw]">
      <h1 className="text-2xl font-semibold">React Chat</h1>

      {user ? (
        <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
          type="button"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={googleSignIn}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
          type="button"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
            alt="Google Sign-in"
            className="w-5 h-5 mr-2"
          />
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default NavBar;
