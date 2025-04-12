import { useEffect } from "react";
import lottie from 'lottie-web'; // Make sure you import Lottie
import './NotFound.scss';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: document.querySelector('.lottie-animation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://lottie.host/d987597c-7676-4424-8817-7fca6dc1a33e/BVrFXsaeui.json' // Updated animation path
        });

        // Cleanup animation on component unmount
        return () => animation.destroy();
    }, []);

    return (
        <div className="error-container">
            <div className="lottie-animation"></div>
            <div className="error-content">
                <h1>404</h1>
                <p>Oops! The page you are looking for does not exist.</p>
                <button onClick={() => navigate('/')} className="btn btn-primary" >Back Home</button>
            </div>
        </div>
    );
}

export default NotFound;