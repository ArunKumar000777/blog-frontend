import React, { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import {  axiosInstance } from "../../config";

const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const getpost = async () => {
            const res = await axiosInstance.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getpost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/posts/${post._id}`, { data: { userId: user._id } });
            // window.location.replace("/");
            navigate("/");
        } catch (error) {}
    };

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/posts/${post._id}`, {
                username: user.username,
                title: title,
                desc: desc,
            });
            setUpdateMode(false);
        } catch (error) {}
    };

    return (
        <div className="singlePost">
            <div className="singlePost__wrapper">
                {post.image && <img src={post.image} alt="singlepostimage" className="singlePost__img" />}
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="singlePost__titleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePost__title">
                        {title}
                        {post.userId === user?._id && (
                            <div className="singlePost__edit">
                                <Edit
                                    sx={{ fontSize: "20px", color: "teal", marginRight: "10px", cursor: "pointer" }}
                                    onClick={() => setUpdateMode(true)}
                                />
                                <Delete
                                    sx={{ fontSize: "20px", color: "tomato", cursor: "pointer" }}
                                    onClick={handleDelete}
                                />
                            </div>
                        )}
                    </h1>
                )}

                <div className="singlePost__info">
                    <span className="singlePost__auth">
                        Author:{" "}
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePost__date">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea value={desc} className="singlePost__descInput" onChange={(e) => setDesc(e.target.value)} />
                ) : (
                    <p className="singlePost__desc">{desc}</p>
                )}
                {updateMode && (
                    <button className="singlePost__button" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
