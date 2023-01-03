import React from "react";
import "./post.css";
import {Link} from "react-router-dom"

const Post = ({ post }) => {
    const PF = "http://localhost:5000/images/"
    return (
        <div className="post">
            <Link to={`/post/${post._id}`}>
            {post.photo && <img className="post__image" src={PF + post.photo} alt="postimage" />}
            </Link>

            <div className="post__infoContainer">
                <div className="post__categories">
                    {post.categories.map((c) => (
                        <span className="post__category">{c.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`}>
                <span className="post__title">{post.title}</span>
                </Link>
                
                <hr />
                <span className="post__date">{new Date(post.createdAt).toDateString()}</span>
                <p className="post__desc">{post.desc}</p>
            </div>
        </div>
    );
};

export default Post;
