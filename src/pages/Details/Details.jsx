import { CinputProfile } from "../../common/CinputProfile/CinputProfile";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Details.css"


import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { feedService, likeIt } from "../../services/apiCalls";
import { userData } from '../../app/slices/userSlice';
import { Card } from '../../common/Ccard/Ccard';
import { CardAdmin } from "../../common/Cadmin/Cadmin";
import { CardUser } from "../../common/CcardUser/CcardUser";
import { CardDetail } from "../../common/Ccard/CcardDetails";


export const Detail = () => {

    const state = useSelector(userData);
    const token = state.credentials.token || ({});
    const [posts, setPosts] = useState([]);
    const [thisPost, setThisPost] = useState(null);
    const navigate = useNavigate();

    const { postId } = useParams();
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetched = await feedService(token);
                setPosts(fetched);
            } catch (error) {
                console.log(error)
            }
        };
        fetchPosts();
    }, [postId, token]);

    // Una vez que se carguen los posts, encontramos el post correspondiente al postId
    useEffect(() => {
        const foundPost = posts.find(post => post._id === postId);
        if (foundPost) {
            setThisPost(foundPost);
        }
    }, [posts, postId]);

    const goFeed = (postId) => {
        navigate(`/feed`)
       }

    return (
        <>
            <div className="Details-design"> soy el post en detalle
                <div className='post-pannel'>
                    {thisPost && (
                        <CardDetail
                            key={thisPost._id}
                            title={thisPost.title}
                            nick={thisPost.nick.name}
                            text={thisPost.text}
                            image={thisPost.image && <img className='profile-img' src={thisPost.image} alt="posts image"></img>}
                            likes={thisPost.likes.length}
                            clickFunction={() => goFeed()}
                        ></CardDetail>
                    )}
                </div>
            </div>
        </>
    );
};
