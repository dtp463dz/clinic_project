import './HomeHeader.scss';
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
import { ImBook } from "react-icons/im";
import { FaBookReader, FaUserNurse, FaCaretDown } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import Header from '../../pages/Hearder/Header';
import SearchHero from '../Search/SearchHero';

const HomeHeader = (props) => {
    return (
        <>
            <Header />
            {props.isShowBanner === true &&
                <>
                    <div>
                        <SearchHero />
                    </div>
                    <div className='home-header-banner' >

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


            }

        </>
    )
}

// truyen redux


export default HomeHeader;