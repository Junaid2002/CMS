import './Video.css';
import homePage from "../assets/homePage.mp4";
const Video = () => {
    return (
      <article className='article'>
        <video className='video' src={homePage} alt="background" autoPlay muted loop/>
      </article>
    );
  };
export default Video;