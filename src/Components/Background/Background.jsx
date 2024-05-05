import './Background.css'
import cpu_video from '../../assets/cpu_video.mp4'
import pic1 from '../../assets/pic1.png'
const Background = ({playStatus,heroCount}) => {
    if (playStatus){
        return(
            <video className='background' autoPlay loop muted>
                <source src = {cpu_video} type = 'video/mp4' />
            </video>
        )
    }
    else if(heroCount === 0){
        return <img src = {pic1} className='background' alt=""/>
    }
  }
  
  export default Background