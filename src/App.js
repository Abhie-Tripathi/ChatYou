import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { auth } from "./firebase";

function App() {
  const [{ user },dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    });
  }, []);

  return (
    <Router>
      {!user && <Login />}
      {user && (
        <div className="App">
          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/room/:roomId" element={<Chat />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
