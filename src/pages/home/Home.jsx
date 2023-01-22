import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import "./home.css";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";

const Home = () => {
    const [posts, setPosts] = useState([]);

    const { search } = useLocation();
    // console.log(search)
    // console.log(posts)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axiosInstance.get("posts" + search);
            setPosts(res.data);
        };
        fetchPosts();
    }, [search]);

    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <SideBar />
            </div>
        </>
    );
};

export default Home;
