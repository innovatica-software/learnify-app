import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Register from './feature/auth/Register';
import Login from './feature/auth/Login';
import Navbar from './feature/common/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
             <Route path="/register" element={<Register></Register>} />
             <Route path="/login" element={<Login></Login>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
