import React, { useContext, useState } from "react";
import "./write.css";
import AddIcon from "@mui/icons-material/Add";
import { Context } from "../../context/Context";
import { publicRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const [lag, setLag] = useState(false);
    const [loading, setLoading] = useState(false);

    // console.log(user);
    const navigate = useNavigate();
    console.log(user._id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let formData = new FormData();
            formData.append("image", file);
            formData.append("title", title);
            formData.append("username", user.username);
            formData.append("desc", desc);
            formData.append("userId", user._id);

            const res = await publicRequest.post("/posts", formData);
            res.data && setLoading(false);
            res.data && navigate("/post/" + res.data.newPost._id);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newPost = {
    //         username: user.username,
    //         title,
    //         desc,
    //     };
    //     if (file) {
    //         const data = new FormData();
    //         const fileName = Date.now() + file.name;
    //         data.append("name", fileName);
    //         data.append("file", file);
    //         newPost.photo = fileName;

    //         try {
    //             await publicRequest.post("/upload", data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     try {
    //         const res = await publicRequest.post("/posts", newPost);
    //         setLag(!lag);
    //         res.data && navigate("/post/" + res.data._id)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    return (
        <div className="write">
            <div className="write__img__container">
                {file && <img className="write__img" src={URL.createObjectURL(file)} alt="" />}
            </div>

            <form action="" className="write__form" onSubmit={handleSubmit}>
                <div className="write__formGroup">
                    <label htmlFor="fileInput">
                        <div className="write__addIcon">
                            <AddIcon />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*"
                        name="image"
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="write__input"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="write__formGroup">
                    <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className="write__input write__text"
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="write__submit" type="submit">
                    Publish
                </button>
            </form>
            {loading ? <Loader /> : null}
        </div>
    );
};

export default Write;
