import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

import { getMyOwnPost } from "../../services/apiCalls";

export const Profile = () => {

  const navigate = useNavigate();
  const state = useSelector(userData);
  const token = state.credentials.token || ({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("esto es my posts" , myPosts)
    if (!token) {
      navigate("/login")
    }
  }, [state])

  //////////////
  const [loadedData, setLoadedData] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {


    const getMyOwnPostInfo = async () => {

      try {
        const fetched = await getMyOwnPost(token)
        setMyPosts(fetched.data) //?
        const newPosts = setMyPosts.data
      
      } catch (error) {
        console.log(error)
      }
    }

      if (token) {
        getMyOwnPostInfo();
      }
  }, [token])


  return (
    <>
      <div className="profile-design">Soy el profile</div>
      <div>
        {loadedData && posts.length > 0 
        ? (
          posts.map(user => {
            const arrayLikes = posts.likes
            
            return (
              <div className='feed-pannel' key={user._id}>
                <div className='feed-img'>{ } </div>
                <div className='feed-img2'>{ } </div>
                <div><img className='post-img' src={post.image} alt="post image"></img></div>
                <div className='feed-img3'>{arrayLikes.length} </div>
                <div className='feed-img4'>{user.name} </div>
              </div>
            )
          })

        ) : (
          
          <div>No hay posts </div>
        )}
      </div>
    </>
  )
}