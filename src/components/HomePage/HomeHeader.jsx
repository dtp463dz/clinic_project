import './HomeHeader.scss';
import { FaBars } from "react-icons/fa";
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { ImBook } from "react-icons/im";
import { FaBookReader, FaUserNurse } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
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
                        <div className='search'>
                            <input type='text' placeholder='Tìm kiếm...' />
                            <i><GoSearch /></i>
                        </div>

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
                <div className='banner-up'>
                    <div className='slide'>
                        <SlideShow />
                    </div>
                </div>
                <div className='banner-down'>
                    <div className='opitons'>
                        <div className='options-child'>
                            <div className='title-child'>
                                <h3>Khám Chuyên Khoa</h3>
                            </div>
                            <div className='icon-child'>
                                <i><ImBook /></i>
                            </div>
                            <div className='content-child'>
                                Cung cấp các dịch vụ y tế phù hợp với từng tình trạng sức khỏe
                            </div>
                        </div>

                        <div className='options-child'>
                            <div className='title-child'>
                                <h3>Hướng Dẫn Khách Hàng</h3>
                            </div>
                            <div className='icon-child'>
                                <i><FaBookReader /></i>
                            </div>
                            <div className='content-child'>
                                Cung cấp thông tin, hỗ trợ giải đáp mọi thắc mắc
                            </div>
                        </div>

                        <div className='options-child'>
                            <div className='title-child'>
                                <h3>Tìm Bác Sĩ</h3>
                            </div>
                            <div className='icon-child'>
                                <i><FaUserNurse /></i>
                            </div>
                            <div className='content-child'>
                                Chọn theo tên, chuyên môn và nhiều hơn thế
                            </div>
                        </div>

                        <div className='options-child'>
                            <div className='title-child'>
                                <h3>Bảng Giá Dịch Vụ</h3>
                            </div>
                            <div className='icon-child'>
                                <i><MdPayment /></i>
                            </div>
                            <div className='content-child'>
                                Danh sách chi phí của từng dịch vụ
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}

// truyen redux


export default HomeHeader;