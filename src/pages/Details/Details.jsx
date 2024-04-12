import { CinputProfile } from "../../common/CinputProfile/CinputProfile";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Details.css"


import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { feedService, likeIt} from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';
import { Card } from '../../common/Ccard/Ccard';


export const Detail = () => {

    const state = useSelector(userData);
    const token = state.credentials.token || ({});
    const [posts, setPosts] = useState([]);

    <div> SOY DETAIL </div>
    const { postId } = useParams();
    // 
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

    return (
        <div className="Details-design"> soy el post en detalle
            <div className='post-pannel'>
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
                                    clickFunction={() => doLike(post._id)}
                                >
                                </Card>

                            )
                        })

                    ) : (
                        <div>No hay posts</div>
                    )}
                </div>

            </div>


        </div>
    )
}