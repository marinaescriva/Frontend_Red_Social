import { CinputProfile } from "../../common/CinputProfile/CinputProfile";
import "./Post.css"

export const Post = () => {

    
    // const [newPosts, setNewPosts] = useState([]);

    // const inputHandler = (e) => {

    //     setUser((prevState) => ({

    //         ...prevState,
    //         [e.target.name]: e.target.value

    //     }))
    // }


    return (
        <div className="Post-design"> soy el post nuevo
            <div className='post-pannel'>


                <CinputProfile
                    type="text"
                    name="title"
                    placeholder="title"
                    // value={post.title || ""}
                    // changeEmit={inputHandler}

                />

                <CinputProfile
                    type="password"
                    name="password"
                    placeholder="passsword"
                    // value={user.password || ""}
                    // changeEmit={inputHandler}

                />


            </div>
            {/* <button className="login-button" onClick={loginMe}></button> */}
            {/* <div className="error">{errorMessage}</div> */}

        </div>
    )
}