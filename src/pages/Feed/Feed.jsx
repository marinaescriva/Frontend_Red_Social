import './Feed.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { feedService, likeIt} from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';
import { Card } from '../../common/Ccard/Ccard';

export const Feed = () => {

  const state = useSelector(userData);
  const token = state.credentials.token || ({});
  const navigate = useNavigate();
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
    
      fetchPosts();
    
  }, [posts])
  
  const doLike = async (id) => {
    const fetched = await likeIt(id , token)
};

const goDetail = (postId) => {
 navigate(`/posts/${postId}`)
}

  return (
    <div className='feed-design'>
     
      <h4>Your feed</h4>
      <div>
        {posts && posts.length > 0 ? (
          posts.map(post => {
            const arrayLikes = post.likes
            return (
              
              <Card 
              key={post._id}
              title={post.title}
              nick={post.nick.name}
              image={post.image && <img className='profile-img' src={post.image} alt="posts image"></img>}
              likes={arrayLikes.length}
              clickFunction={() => doLike(post._id) }
              detailFunction={()=> goDetail(post._id)}
              >
              </Card>
           
            )
          })

        ) : (
          <div>No hay posts</div>
        )}
      </div>
    </div>
   
  );
};
