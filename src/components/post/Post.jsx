import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
import { LS } from "../../config";

const Post = ({ post }) => {
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
                    <span className="post__auther">{post.username}</span>
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
