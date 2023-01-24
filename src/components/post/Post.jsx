import React, { useContext, useEffect } from "react";
import "./post.css";
import { Link } from "react-router-dom";
import { LS } from "../../config";
import { Context } from "../../context/Context";
import { publicRequest } from "../../requestMethods";

const Post = ({ post }) => {
    // const { user } = useContext(Context);
    // useEffect(() => {
    //     const getPostOwner = async () => {
    //         const res = await publicRequest("/users/" + user._id);
    //         console.log(res);
    //     };
    //     getPostOwner()
    // }, []);
    // console.log(post)
    // const PF = "http://localhost:5000/images/"
    const PF = LS;
    return (
        <div className="post">
            <Link to={`/post/${post._id}`}>
                {post.image && <img className="post__image" src={post.image} alt="postimage" />}
            </Link>

            <div className="post__infoContainer">
                <div className="post__categories">
                    {post.categories.map((c) => (
                        <span className="post__category">{c.name}</span>
                    ))}
                </div>
                <div className="post__details">
                    <span className="post__auther">
                        posted by : <span className="auther__name">{post.username}</span>
                    </span>
                    <span className="post__date">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <div className="post__title__desc__container">
                    <Link to={`/post/${post._id}`}>
                        <span className="post__title">{post.title}</span>
                    </Link>
                    <p className="post__desc">{post.desc}</p>
                </div>
            </div>
        </div>
    );
};

export default Post;
