import './HomeHeader.scss';
import { FaBars } from "react-icons/fa";
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
import { FaPersonCircleQuestion } from "react-icons/fa6";
import SlideShow from './SlideShow';


const HomeHeader = () => {
    return (
        <>
            <div className="home-header-container">
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className='fa-bars'> <FaBars /></i>
                        <div className='header-logo'></div>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div className='title-content'>Tất cả</div>
                        </div>
                        <div className='child-content'>
                            <div className='title-content'>Tại nhà</div>
                        </div>
                        <div className='child-content'>
                            <div className='title-content'>Tại viện</div>

                        </div>
                        <div className='child-content'>
                            <div className='title-content'>Sống khỏe</div>
                        </div>

                        {/* Phần tìm kiếm  */}


                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i><FaPersonCircleQuestion /></i>
                            Hỗ trợ khách hàng
                        </div>
                        <div className='flag'>
                            VN
                        </div>
                    </div>
                </div>
            </div>

            <div className='home-header-banner'>
                <div className='slide'>
                    <SlideShow />
                </div>
            </div>

        </>
    )
}

// truyen redux


export default HomeHeader;