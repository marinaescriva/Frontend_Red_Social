import './Feed.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { feedService } from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';


export const Feed = () => {

const dispatch = useDispatch();
const {token} = userData();

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const fetched = await feedService(token)
        setPosts(fetched.data);

        console.log(token)
        console.log(token.data)
        console.log(dataUser)

        console.log(feedService)
        console.log(fetched)

      } catch (error) {
        console.log(error)
      }
    };

    if(token){
      fetchPosts();
    }

  }, [token])

  //   if (posts.length === 0) {

  //     const postsFeed = async () => {
        
  //     }
  //     postsFeed()
  //   }
  // }, [posts])

  return (
    <div className='feed-design'>
      <h4>Your feed</h4>

      {posts.length > 0 ? (
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
