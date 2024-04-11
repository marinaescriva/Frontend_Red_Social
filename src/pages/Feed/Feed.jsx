import './Feed.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { feedService } from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';

export const Feed = () => {

  const state = useSelector(userData);
  const token = state.credentials.token || ({});


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {

      try {

        const fetched = await feedService(token)
        setPosts(fetched);

      } catch (error) {
        console.log(error)
      }
    };

    if (token) {
      fetchPosts();
    }

  }, [token])

  return (
    <div className='feed-design'>
     
      <h4>Your feed</h4>
      <div>
        {posts && posts.length > 0 ? (
          posts.map(post => {
            const arrayLikes = post.likes
            return (
              
            <div className='feed-pannel' key={post._id}>
              <div className='feed-img'>{post.title} </div>
              <div className='feed-img2'>{post.text} </div>
              <div >{post.image && <img className='profile-img' src={post.image} alt="posts image"></img>}</div>
              <div className='feed-img3'>{arrayLikes.length} </div>
              <button className="like-button"></button>
              <div className='feed-img4'>{post.nick.name} </div>
            </div>
           
            )
          })

        ) : (
          <div>No hay posts</div>
        )}
      </div>
    </div>
   
  );
};
