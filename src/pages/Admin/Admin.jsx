import './Admin.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { feedService , feedUsers } from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';
import { Card } from '../../common/Ccard/Ccard';

export const Admin = () => {

    const state = useSelector(userData);
    const token = state.credentials.token || ({});
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [users, setUsers] =  useState([]);

if(state?.credentials?.user?.roleName !== "super_admin"){
    setTimeout ( ()=>{
        navigate("/")
    })
}

    useEffect(() => {


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

    useEffect(() => {


        if (state?.credentials?.user?.roleName === "super_admin") {

            const fetchUsers = async () => {

                try {
                    const fetched = await feedUsers(token)
                    setUsers(fetched);
                    
                } catch (error) {
                    console.log(error)
                }
            };
           
                fetchUsers();
            
        }
    }, [users])



    return (
        <div className='admin-design'> ADDDMIN
            <h4>Your feed</h4>
            <div>
                {users && users.length > 0 ? (
                    users.map(user => {
                        // const arrayLikes = user.likes
                        return (
                            <div>
                            <Card
                                key={user._id}
                                title={user.name}
                                nick={user.email}
                            >
                            </Card>
                            </div> 
                        )
                    })
                ) : (
                    <div>No hay posts</div>
                )}

            </div>
            <div>
                {posts && posts.length > 0 ? (
                    posts.map(post => {
                        const arrayLikes = post.likes
                        return (
                            <div>

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