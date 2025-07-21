// About.jsx
import './About.scss';
import { useEffect, useState } from 'react';
import { getAllHandBook } from '../../../services/handbookService';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const [handbooks, setHandbooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllHandBook(1, 4);
                if (res && res.errCode === 0) {
                    setHandbooks(res.data.handbooks || []);
                }
            } catch (error) {
                console.error('Error fetching handbooks:', error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (id) => {
        navigate(`/detail-handbook/${id}`);
    };

    return (
        <div className='section-share section-about'>
            <div className='section-bg'>

                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%"
                            height="250px"
                            src="https://www.youtube.com/embed/opuosC5L9n0"
                            title="Booking Health. Our process: Step-by-Step"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <p className='video-title'>Hướng dẫn đặt khám qua BookingHealth</p>
                    </div>
                    <div className='content-right'>
                        <h3>Tin nổi bật</h3>
                        <div className="handbook-list">
                            {handbooks.map(item => (
                                <div className="handbook-item" key={item.id} onClick={() => handleClick(item.id)}>
                                    <img src={item.image} alt={item.title} />
                                    <p>{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
