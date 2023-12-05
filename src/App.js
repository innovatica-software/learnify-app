import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import Register from "./feature/auth/Register";
import Login from "./feature/auth/Login";
// import Country from "./feature/Country/Country";
import Discussion from "./feature/Discussion/Discussion";
import Resources from "./feature/Resources/Resources";
import Translate from "./feature/Translate/Translate";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import { theme } from "./Theme/AppTheme";
import { ThemeProvider } from "styled-components";
import Quiz from "./feature/Quiz/Quiz";
import { MainApp } from "./components/MainApp/MainApp";
import CountryLevel from "./feature/QuizLevel/CountryLevel";
import DiscussionDetails from "./feature/Discussion/DiscussionDetails";
import Profile from "./feature/profile/Profile";
import NotFound from "./feature/NotFound/NotFound";
import Main from "./feature/main/Main";


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
    <ThemeProvider theme={theme}>
      <MainApp className="app">
        
        <Router>
          <Layout>
            <Routes>
              {/* <Route path="/" element={<Country />} /> */}
              <Route exact path="/" element={<Main />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/discussion" element={<Discussion />} />
              <Route
                path="/discussion/:discussionId"
                element={<DiscussionDetails />}
              />
              <Route path="/resources" element={<Resources />} />
              <Route path="/translate" element={<Translate />} />
              <Route path="/quiz/:levelId" element={<Quiz />} />
              <Route path="/country/:countryId" element={<CountryLevel />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/country" element={<CountryLevel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
   
      </MainApp>
    </ThemeProvider>
  );
}

export default App;
