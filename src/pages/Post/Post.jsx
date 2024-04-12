import { CinputProfile } from "../../common/CinputProfile/CinputProfile";
import { CButton } from "../../common/Cbutton/Cbutton";
import "./Post.css"
import { createPost } from "../../services/apiCalls";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

export const Post = () => {
   
    const { credentials } = useSelector(userData);
    console.log(credentials) // esto es correcto, contiene token y user con dentro userId.
    const dataUser = JSON.parse(localStorage.getItem("passport"));
    const [write, setWrite] = useState("disabled");
    const [isCreating, setIsCreating] = useState(false);

    const token = credentials.token || ({});
    
    const userId = credentials.user.userId; 

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({
        title: "",
        text: "",
        image:""
    });

    const inputHandler = (e) => {
        // const { name, value } = e.target;
        setPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const creatingPost = async () => {
        setIsCreating(true);

        if (post.title.length > 25 || post.text.length > 300) {
            console.error("Title or description is too long");
            setIsCreating(false);
            return;
        }
        console.log(userId) // si que es el userid correcto
        try {
            const newPost = {
                title: post.title,
                text: post.text,
                image: post.image,
                userId: userId
            };
            const response = await createPost(token, post);
          
            if (response.success) {
                const createdPost = {
                    ...response.data,
                    user: response.user
                };
                setPosts(prevPosts => [createdPost, ...prevPosts]);
                setPost({
                    title: "",
                    text: ""
                });
                setIsCreating(false);
            } else {
                console.error("Error creating new post:", response.message); 
                setIsCreating(false);
            }
        } catch (error) {
            console.error("Error creating new post:", error);
            setIsCreating(false);
        }
    };

    return (
        <div className="Post-design"> soy el post nuevo
            <div className='post-pannel'>


                <CinputProfile
                    type="text"
                    name="title"
                    value={post.title || ""}
                    placeholder="title"
                    disabled={write}
                    functionChange={(e) => inputHandler(e)}
                />

                <CinputProfile
                    type="text"
                    name="text"
                    value={post.text || ""}
                    placeholder="description"
                    disabled={write}
                    functionChange={(e) => inputHandler(e)}
                />
                <CinputProfile
                    type="text"
                    name="image"
                    value={post.image || ""}
                    placeholder="image url"
                    disabled={write}
                    functionChange={(e) => inputHandler(e)}
                />


                <CButton
                    className={write === "" ? "CButtonDesign2 CButtonDesign" : "CButtonDesign"}
                    title={write === "" ? "Confirm" : "New"}
                    functionEmit={write === "" ? creatingPost : () => setWrite("")}
                />

            </div>

        </div>
    )
}