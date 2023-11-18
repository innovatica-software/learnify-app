import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import Register from "./feature/auth/Register";
import Login from "./feature/auth/Login";
import Country from "./feature/Country/Country";
import Discussion from "./feature/Discussion/Discussion";
import Resources from "./feature/Resources/Resources";
import Translate from "./feature/Translate/Translate";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const PUBLIC_ROUTES = ["login", "forgot-password", "register"];
  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );
  if (isAuthenticated && isPublicPage) {
    redirect("/");
  }
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Country />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/translate" element={<Translate />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
