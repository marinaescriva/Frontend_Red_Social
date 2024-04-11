import './Admin.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { feedService } from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';
import { Card } from '../../common/Ccard/Ccard';

export const Admin = () => {

    const state = useSelector(userData);
    const token = state.credentials.token || ({});
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

console.log(state)


    useEffect(() => {

        if(state?.credentials?.roleName !== "super_admin"){
            navigate("/")
        }

        if (state?.credentials?.user?.roleName === "super_admin") {

            const fetchPosts = async () => {

                try {
                    const fetched = await feedService(token)
                    setPosts(fetched);

                } catch (error) {
                    console.log(error)
                }
            };
           
                fetchPosts();
            
        }
    }, [posts])

    //enseñar los users

    //enseñar posts



    return (
        <div className='admin-design'> ADDDMIN
            <h4>Your feed</h4>
            <div>
                {posts && posts.length > 0 ? (
                    posts.map(post => {
                        const arrayLikes = post.likes
                        return (
                            <div> ESTO QUE

                            <Card
                                key={post._id}
                                title={post.title}
                                nick={post.nick.name}
                                image={post.image && <img className='profile-img' src={post.image} alt="posts image"></img>}
                                likes={arrayLikes.length}
                            >
                            </Card>
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