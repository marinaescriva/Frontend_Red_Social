import './Feed.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedService } from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';

export const Feed = () => {

const dispatch = useDispatch();
const state = useSelector(userData);
const token = state.Credentials || ({});

const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {

      try {
    
        const fetched = await feedService(token)

        console.log("fetched data" , fetched.data)

        setPosts(fetched.data);

      } catch (error) {
        console.log(error)
      }
    };

    if(token){
      fetchPosts();
    }

  }, [token])

  return (
    <div className='feed-design'>
      <h4>Your feed</h4>

      {posts && posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className='post'>
          </div>
        ))
      ) : (
        <div>No hay posts</div>
      )}
    </div>
  );
};
