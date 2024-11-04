import React, { useEffect, useState } from "react";
import "./App.css";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "./firebase/firebase";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

function App() {
  const [userInfo, setUser] = useState("");
  const [logged, setLogged] = useState(false);
  const [todos, setTodos] = useState();

  const handerGoogleSignin = async (params) => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLogged(true);
        setDoc(doc(db, "todo-list", user.email), {
          deleted: false,
        });
        setUser(user);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("email", user);
      if (user) {
        setUser(user);
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    onSnapshot(doc(db, "todo-list", `${userInfo.email}`), (doc) => {
      setTodos(doc.data()?.savedShows);
    });
  }, [userInfo?.email]);

  console.log(userInfo);

  const signOutHandler = async () => {
    await signOut(auth);
    setLogged(false);
  };

  const todoRef = doc(db, "todo-list", `${userInfo?.email}`);

  const deleteShow = async (passedID) => {
    try {
      // const result = todos.filter((item) => item.id !== passedID);
      await updateDoc(todoRef, {
        deleted: true,
      });
      console.log(todos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="content ">
        <div className="card">
          <h4 className="title">
            Log in with Google and then request to delete all your "ecommerce"
            data this will take a week
          </h4>
          {logged === false ? (
            <button className="button" onClick={handerGoogleSignin}>
              Sign in with google
            </button>
          ) : (
            <div>
              <h3 className="title">Hi: {userInfo?.displayName}</h3>
              <h3 className="title">{userInfo?.email}</h3>
              <h3 className="desc">
                if you wand delete your app data please click that button
              </h3>
              {todos === false ? (
                <button className="button" onClick={deleteShow}>
                  Delete
                </button>
              ) : (
                <h3 className="price">your app data deleted succssesfuly</h3>
              )}
              <button className="button" onClick={signOutHandler}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
