import './Feed.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { feedService } from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';

export const Feed = () => {

// const dispatch = useDispatch();
const state = useSelector(userData);
const token = state.credentials.token || ({});


const [posts, setPosts] = useState([]);

  useEffect(() => {
    // console.log(state)
    // console.log("el token" ,token)
    const fetchPosts = async () => {

      try {
    
        const fetched = await feedService(token)

        // console.log("fetched data" , fetched.data)

        setPosts(fetched);

      } catch (error) {
        console.log(error)
      }
    };

    if(token){
      fetchPosts();
    }

  }, [token])

  // console.log(posts)

  return (
    <div className='feed-design'>
      <h4>Your feed</h4>
    <div>
      {posts && posts.length > 0 ? (
        posts.map(post => (
          <div className='feed-pannel'>
          <div key={post._id} className='feed-img'>
            <div className='feed-img2'>{post.title} </div>
            <div className='feed-img3'>{post.description} </div>

          </div>
          </div>
        ))
       
      ) : (
        <div>No hay posts</div>
      )}
    </div>
    </div>
  );
};
