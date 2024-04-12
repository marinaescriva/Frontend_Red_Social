import './Admin.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { feedService , feedUsers } from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';
import { CardUser } from '../../common/CcardUser/CcardUser';
import { CardAdmin } from '../../common/Cadmin/Cadmin';

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

    
  const deletingPosts = async (postId) => {  // is not functional yet

    try {

      const fetched = await deletePost(postId, token)

      if (fetched.success) {
        setMyPosts(posts.filter(item => item._id !== postId))

        // const update = getMyOwnPost (fetched)
        // setPosts(update)

      }
    } catch (error) {
      console.log(error)
    }
  }

  const deletingUsers = async (postId) => { // is not functional yet

    try {

      const fetched = await deletePost(postId, token)

      if (fetched.success) {
        setMyPosts(posts.filter(item => item._id !== postId))

        // const update = getMyOwnPost (fetched)
        // setPosts(update)

      }
    } catch (error) {
      console.log(error)
    }
  }



    return (
        <div className='admin-design'> ADDDMIN
            <h4>Your feed</h4>
            <div>
                {users && users.length > 0 ? (
                    users.map(user => {
                        // const arrayLikes = user.likes
                        return (
                            <div>
                            <CardUser
                                key={user._id}
                                name={user.name}
                                email={user.email}
                                deleteFunction={deletingUsers}
                            >
                            </CardUser>
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

                            <CardAdmin
                                key={post._id}
                                title={post.title}
                                nick={post.nick.name}
                                image={post.image && <img className='profile-img' src={post.image} alt="posts image"></img>}
                                likes={arrayLikes.length}
                                deleteFunction={deletingPosts}
                            >
                            </CardAdmin>
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