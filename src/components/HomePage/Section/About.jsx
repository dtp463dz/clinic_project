import './About.scss';
const About = (props) => {

    return (
        <div className='section-share section-about'>
            <div className='section-bg'>
                <div className='section-about-header'>
                    Truyền thông nói về BookingHealth
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%" height="400px" src="https://www.youtube.com/embed/opuosC5L9n0"
                            title="Booking Health. Our process: Step-by-Step"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Đây là mô tả</p>
                    </div>

                </div>
            </div>

        </div>
    )
}


export default About;