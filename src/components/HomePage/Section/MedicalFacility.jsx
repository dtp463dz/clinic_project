import './MedicalFacility.scss';
import Slider from "react-slick";
import BvVietDuc from '../../../assets/medical/benhvienvietduc.jpg'
const MedicalFacility = (props) => {

    return (
        <div className='section-medical'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cơ sở y tế</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${BvVietDuc})` }}
                                />
                                <div className='section-content'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>

                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${BvVietDuc})` }}
                                />
                                <div className='section-content'>Bệnh viện Chợ Rẫy</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${BvVietDuc})` }}
                                />
                                <div className='section-content'>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${BvVietDuc})` }}
                                />
                                <div className='section-content'>Phòng khám Bệnh viện Đại học Y Dược 1</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${BvVietDuc})` }}
                                />
                                <div className='section-content'>Bệnh viện Ung bướu Hưng Việt</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${BvVietDuc})` }}
                                />
                                <div className='section-content'>Hệ thống y tế MEDLATEC</div>
                            </div>
                        </div>
                    </Slider>
                </div>


            </div>
        </div>
    )
}


export default MedicalFacility;