import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { myProfile, updateProfile } from "../../services/apiCalls";

import { getMyOwnPost, deletePost } from "../../services/apiCalls";
import { CButton } from "../../common/Cbutton/Cbutton";
// import { CButtonCreate } from "../../common/CbutttonCreate/CbuttonCreate";
import { CinputProfile } from '../../common/CinputProfile/CinputProfile';
import { validation } from "../../utils/functions";
import { ClinkPost } from "../../common/Clink/Clink";

export const Profile = () => {

  const navigate = useNavigate();

  const state = useSelector(userData);
  const token = state.credentials.token || ({});
  const [posts, setPosts] = useState([]);
  const [loadedData, setLoadedData] = useState(true); //quite el false

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [state])


  const dataUser = JSON.parse(localStorage.getItem("passport"));
  const [write, setWrite] = useState("disabled");

  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: ""
  })

  const [userError, setUserError] = useState({
    nameError: "",
    surnameError: "",
    emailError: ""
  })

  const inputHandler = (e) => {
    const { name , value} = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const checkError = (e) => {
    const error = validation(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };


  useEffect(() => {

    if (!token) {
      navigate("/") 
    
    }

  }, [token])

  useEffect(() => {
    const getmyProfile = async () => {
      try {
       
        const fetched = await myProfile(token)
    
        setUser({
          name: fetched.name,
          email: fetched.email,
        })

        setLoadedData(true)

      } catch (error) {
        console.log(error)

      }
    }
    getmyProfile()
  }, [token, loadedData])


  const updateData = async () => {

    try {
      
      const updatedUser = {
        ...user,
        name: user.name
      }
      const fetched = await updateProfile(token, updatedUser)

      setUser((prevState) => ({
        ...prevState,
        name: fetched.name || prevState.name,
        email: fetched.email || prevState.email
      }));

      setWrite("disabled")

    } catch (error) {
      console.log(error.message);
    }
  }

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {

    const getMyOwnPostInfo = async (token) => {


      try {
        const fetched = await getMyOwnPost(token)

        setMyPosts(fetched) //? quite .data
        const newPosts = setMyPosts.data

      } catch (error) {
        console.log(error)
      }
    }

    if (token) {
      getMyOwnPostInfo(token);
    }
  }, [])


  const deletingPosts = async (postId) => {

    try {

      const fetched = await deletePost(postId, token)

      if (fetched.success) {
        setMyPosts(posts.filter(item => item._id !== postId))

      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="profile-design">

      <ClinkPost 
      path={"/post"}
      title={"new post"}>
      </ClinkPost>
        <>
          <div className="profile-cards">
            <CinputProfile
              type="text"
              name="name"
              placeholder="name"
              value={user.name || ""}
              disabled={write}
              functionChange={(e) => inputHandler(e)}
              functionBlur={(e) => checkError(e)}
            />
            <div className='error'>{userError.nameError}</div>

            <CinputProfile
              type="email"
              name="email"
              placeholder="email"
              value={user.email || ""}
              disabled={"disabled"}
              functionChange={(e) => inputHandler(e)}
              functionBlur={(e) => checkError(e)}

            />
            <div className='error'>{userError.emailError}</div>

            <CButton
              className={write === "" ? "CButtonDesign2 CButtonDesign" : "CButtonDesign"}
              title={write === "" ? "Confirm" : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            />

          </div>
        </>
        <div className="profile-cards">
          {loadedData && myPosts.length > 0

            ? (
              myPosts.map(post => {
                const arrayLikes = post.likes
                return (

                  <div key={post.id} className='profile-pannel'>

                    <div className='card-title-profile'>{post.title}</div>
                    <div className='card-text-profile'>{post.text} </div>
                    <div >{post.image && <img className='card-img-profile' src={post.image} alt="posts image"></img>}</div>
                    <div className='card-text-profile'>{arrayLikes.length} </div>
                    <div className='card-nick-profile'>{post.nick} </div>

                    <CButton
                      className={'CButtonDesign'}
                      title={`Delete post `}
                      functionEmit={() => deletingPosts(post._id)}
                    />

                  </div>
                )
              })

            ) : (

              <div>No hay posts </div>
            )}
        </div>

      </div>
    </>
  )
}