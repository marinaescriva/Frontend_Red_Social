import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { myProfile, updateProfile } from "../../services/apiCalls";

import { getMyOwnPost, deletePost } from "../../services/apiCalls";
import { CButton } from "../../common/Cbutton/Cbutton";
import { Cinput } from '../../common/Cinput/Cinput';
import { validation } from "../../utils/functions";

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

  //////////////TRAER MY PROFILE

  const dataUser = JSON.parse(localStorage.getItem("passport"));
  const [write, setWrite] = useState("disabled");
  //   const [tokenStorage, setTokenStorage] = useState (dataUser?.token)
  // console.log(dataUser)
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

    console.log(token)
    // console.log(tokenStorage , "ESTO ES STORAGE da undefined")

    if (!token) {
      navigate("/") //esto era a home
      /* redirect to home if you are not logged */
    }

  }, [token])

  useEffect(() => {
    const getmyProfile = async () => {
      try {
        console.log(token)
        const fetched = await myProfile(token)
        console.log(fetched)

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

      console.log(updatedUser)
      setUser((prevState) => ({
        ...prevState,
        name: fetched.name || prevState.name,
        email: fetched.email || prevState.email
      }));

      setWrite("disabled")

      console.log(fetched.name) //aqui sale el nombre antiguo, no guarda la modificacion del nombre
    } catch (error) {
      console.log(error.message);
    }
  }

  ////////////// TRAER MY POSTS

  // const [loadedData, setLoadedData] = useState(true); //quite el false
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

        // const update = getMyOwnPost (fetched)
        // setPosts(update)

      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="profile-design">Soy el profile
        <>
          <div className="profile-cards">
            <Cinput
              type="text"
              name="name"
              placeholder="name"
              value={user.name || ""}
              disabled={write}
              functionChange={(e) => inputHandler(e)}
              functionBlur={(e) => checkError(e)}
            />
            <div className='error'>{userError.nameError}</div>

            <Cinput
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

                    <div className='profile-img'>{post.text} </div>
                    <div className='profile-img2'>{post.title}</div>
                    <div >{post.image && <img className='profile-img' src={post.image} alt="posts image"></img>}</div>
                    <div className='profile-img3'>{arrayLikes.length} </div>
                    <div className='profile-img4'>{post.nick} </div>

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