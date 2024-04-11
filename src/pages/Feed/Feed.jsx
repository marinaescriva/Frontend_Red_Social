import './Feed.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { feedService, likeIt} from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';
import { Card } from '../../common/Ccard/Ccard';

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

  
  const doLike = async (id) => {
    console.log(id , "el id")

    console.log(token)
    // console.log(_id)
  

    const fetched = await likeIt(id , token) //orden ?


      //   setTimeline(timeline.map(item => 
      //     item._id === post._id 
      //         ? {...item, likes: post.likes.includes(rdxUser.credentials.user.id) 
      //             ? item.likes.filter(id => id !== rdxUser.credentials.user.id) 
      //             : [...item.likes, rdxUser.credentials.user.id]
      //         } 
      //         : item
      // ));

   

        // setTimeout(() => {
        //     navigate("/profile")
        // }, 500)
    
};

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

              >
                </Card>

            // <div className='feed-pannel' key={post._id}>
            //   <div className='feed-img'>{post.title} </div>
            //   <div className='feed-img2'>{post.text} </div>
            //   <div >{post.image && <img className='profile-img' src={post.image} alt="posts image"></img>}</div>
            //   <div className='feed-img3'>{arrayLikes.length} </div>

            //   <button className="like-button" onClick={doLike(post._id)}></button>

            //   <div className='feed-img4'>{post.nick.name} </div>
            // </div>
           
            )
          })

        ) : (
          <div>No hay posts</div>
        )}
      </div>
    </div>
   
  );
};
