// import 'react-slideshow-image/dist/styles.css'
import './SlideShow.scss';
import { Fade, Slide } from 'react-slideshow-image';
const spanStyle = {
    // padding: '20px',
    // background: '#efefef',
    // color: '#000000'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
}
const slideImages = [
    {
        url: 'https://img.freepik.com/free-vector/heart-with-cardiograph-line-medical-blue-background_1017-24816.jpg',
    },
    {
        url: 'https://img.freepik.com/premium-photo/doctor-raising-hands-up-show-virtual-screen-with-blue-icon-vaccine-protection-clinic-background-medical-technology-futuristic-concept_159334-78.jpg',
    },
    {
        url: 'https://img.freepik.com/free-photo/close-up-doctor-with-stethoscope_23-2149191355.jpg',
    },
    {
        url: 'https://plus.unsplash.com/premium_photo-1670459707420-f928b82a7307?q=80&w=1519&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
];

const SlideShow = () => {
    return (
        <div className="slide-container">
            <Fade>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                    </div>
                ))}
            </Fade>
        </div>
    )
}

export default SlideShow;
