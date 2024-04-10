import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

import { getMyOwnPost, deletePost} from "../../services/apiCalls";
import { CButton } from "../../common/Cbutton/Cbutton";

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
  const [loadedData, setLoadedData] = useState(true); //quite el false
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    console.log(myPosts.length, "esto es el length de myposts") // da 0 pero si tiene 1
    console.log(token)
    console.log(myPosts, "esto es myposts")

    const getMyOwnPostInfo = async () => {


      try {
        const fetched = await getMyOwnPost(token)
        console.log(fetched, "esto es fetched")
        console.log(myPosts)
        console.log(loadedData)
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



  const deletingPosts = async (postId) => {

    try {
        
        const fetched = await deletePost(postId , token )

        if (fetched.success){
        setPosts(posts.filter(item => item._id !== postId))

        }
    } catch (error) {
        console.log(error)
    }
}


  return (
    <>
      <div className="profile-design">Soy el profile
        <div className="profile-cards">
          {loadedData && myPosts.length > 0

            ? (
              myPosts.map(post => {
                const arrayLikes = post.likes
                return (

                  <div key={post.id} className='profile-pannel'>

                    <div className='profile-img'>{post.text} </div>
                    <div className='profile-img2'>{post.title}</div>
                    <div >{post.image && <img className='profile-img' src={post.image} alt="posts image"></img>}</div>
                    <div className='profile-img3'>{arrayLikes.length} </div>
                    <div className='profile-img4'>{post.nick} </div>

                    <CButton
                      className={'CButtonDesign'}
                      title={`Delete post `}
                      functionEmit={() => deletingPosts(post._id)}
                    />

                  </div>
                )
              })

            ) : (

              <div>No hay posts </div>
            )}
        </div>

      </div>
    </>
  )
}