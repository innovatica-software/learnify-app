import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./feature/auth/Register";
import Login from "./feature/auth/Login";
import Navbar from "./feature/common/Navbar";
import Country from "./feature/Country/Country";
import Discussion from "./feature/Discussion/Discussion";
import Resources from "./feature/Resources/Resources";
import Translate from "./feature/Translate/Translate";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Country />} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/translate" element={<Translate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
