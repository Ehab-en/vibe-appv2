import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from './pages/Profile';
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import NewPost from "./pages/NewPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />}/>
      <Route path="/notifications"element={<Notifications />}/>
      <Route path="/explore" element={<Explore />}/>
      <Route path="/newpost" element={<NewPost />}/>
    </Routes>
  );
}

export default App;