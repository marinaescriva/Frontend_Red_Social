import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

import { getMyOwnPost} from "../../services/apiCalls";

export const Profile = () => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData);
    const token = rdxUser.credentials.token;

    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    }, [rdxUser])
 
    //////////////

    const [ myPosts , setMyPosts] = useState ([])

    useEffect(() => {

        const getMyOwnPostData = async () => {

        try {
            const fetched = await getMyOwnPost(token)
            setMyPosts(fetched)
        } catch (error){
            console.log(error)
        }
        if(token){
        getMyOwnPostData();
        }
}
    }, [token])


    return (
        <>
           <div className="profile-design">Soy el profile</div>
           <div>
           {myPosts && myPosts.length > 0 ? (
          myPosts.map(user => {
            const arrayLikes = post.likes
            return (
            <div className='feed-pannel' key={user._id}>
              <div className='feed-img'>{} </div>
              <div className='feed-img2'>{} </div>
              <div><img className='post-img' src={post.image} alt="post image"></img></div>
              <div className='feed-img3'>{arrayLikes.length} </div>
              <div className='feed-img4'>{user.name} </div>
            </div>
            )
          })

        ) : (
          <div>No hay posts</div>
        )}
           </div>
        </>
    )
}