import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import TopBar from "./components/topbar/TopBar";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    const { user } = useContext(Context);
    return (
        <BrowserRouter>
            <ScrollToTop />
            <TopBar />
            <Routes
                basename="/blog-frontend"
            >
                <Route path="/" element={<Home />} />
                <Route path="write" element={user ? <Write /> : <Register />} />
                <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="settings" element={user ? <Settings /> : <Register />} />
                <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="post/:postId" element={<Single />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
