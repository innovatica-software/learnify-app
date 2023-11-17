import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Register from './feature/auth/Register';
import Login from './feature/auth/Login';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
             <Route path="/register" element={<Register></Register>} />
             <Route path="/login" element={<Login></Login>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
