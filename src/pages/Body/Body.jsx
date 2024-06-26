import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Feed } from "../Feed/Feed";
import { Profile } from "../Profile/Profile";
import { Admin } from "../Admin/Admin";
import { Post } from "../Post/Post";
import { Detail } from "../Details/Details";

export const Body = () => {
    return (
        <Routes>
            <Route path="*" element= {<Navigate to ={"/"} replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/post" element={<Post/>} />
            <Route path="/posts/:postId" element={<Detail/>} />
        </Routes>
    )
}