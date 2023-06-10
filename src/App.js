import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
const user = null

  return (
    <Router>
      {!user && <Login/>}
      {user &&
      <div className="App">
        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/room/:roomId" element={<Chat />} />
          </Routes>
        </div>
      </div>}
    </Router>
  );
}

export default App;
