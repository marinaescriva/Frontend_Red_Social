import './Feed.css';
import { useEffect, useState } from "react";
import { feedService } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("passport"))?.token;

  useEffect(() => {
    const feed = async () => {
      try {
        const fetched = await feedService(token);
       console.log(setPosts)
       console.log(posts)

        setPosts(fetched.data);
      } catch (error) {
        console.log(error);
      }
    };

    feed();
  }, [token]);

  return (
    <div className='feed-design'>
      <h4>Your feed</h4>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className='post'>
            {/* Renderizar el contenido del post aquí */}
          </div>
        ))
      ) : (
        <div>No hay posts</div>
      )}
    </div>
  );
};
