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
    if (!token) {
      navigate("/login")
    }
  }, [state])

  //////////////
  const [loadedData, setLoadedData] = useState(); //quite el false
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    console.log(myPosts.length) // da 0 pero si tiene 1

    const getMyOwnPostInfo = async () => {

      try {
        const fetched = await getMyOwnPost(token)
        setMyPosts(fetched) //? quite .data
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
        {loadedData && myPosts.length > 0 
        
        ? (
          myPosts.map(post => {
            const arrayLikes = post.likes
            
            return (
              <div className='profile-pannel' key={post._id}>
                <div className='feed-img'>{post.text} </div>
                <div className='feed-img2'>{post.title } </div>
                <div><img className='post-img' src={post.image} alt="post image"></img></div>
                <div className='feed-img3'>{arrayLikes.length} </div>
                <div className='feed-img4'>{post.nick} </div>
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