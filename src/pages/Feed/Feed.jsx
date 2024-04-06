import './Feed.css';
// import { Clink } from '../Clink/Clink'


export const Feed = () => {
  return (
    <>
      <div className="feed-design">

      <div className='feed-pannel'>
        <div className='feed-user'>Carla</div>
      {/* QUIERO AÑADIR EL NOMBRE DE LOS USUARIOS DE ESE POST EN CONCRETO <Clink path="/profile" title={rdxUser?.credentials?.user?.name} ></Clink> */}
        <div className='feed-img'></div>
        
        <div></div>
      </div>
      <div className='feed-pannel'></div>
      <div className='feed-pannel'></div>

      </div>
    </>
  );
}