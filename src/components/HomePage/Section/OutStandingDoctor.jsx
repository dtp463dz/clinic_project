import './OutStandingDoctor.scss';
import Slider from "react-slick";
import BvVietDuc from '../../../assets/doctor/pgskieudinhhung.jpg'
const OutStandingDoctor = (props) => {

    return (
        <div className='section-doctor'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Bác sĩ nổi bật</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className="outder-bg">
                                    <div className='bg-image'
                                        style={{ backgroundImage: `url(${BvVietDuc})` }}
                                    />
                                </div>
                                <div className='position text-center'>
                                    <div className='section-content'>Phó Giáo sư, Tiến sĩ Kiều Đình Tùng</div>
                                    <span className='section-infor'>Thần kinh, Cột sống, Ngoại thần kinh</span>
                                </div>
                            </div>
                        </div>

                        <div className='section-customize'>
                            <div className="outline">
                                <div className="outder-bg">
                                    <div className='bg-image'
                                        style={{ backgroundImage: `url(${BvVietDuc})` }}
                                    />
                                </div>
                                <div className='position text-center'>
                                    <div className='section-content'>Phó Giáo sư, Tiến sĩ Kiều Đình Tùng</div>
                                    <span className='section-infor'>Thần kinh, Cột sống, Ngoại thần kinh</span>
                                </div>
                            </div>
                        </div>

                        <div className='section-customize'>
                            <div className="outline">
                                <div className="outder-bg">
                                    <div className='bg-image'
                                        style={{ backgroundImage: `url(${BvVietDuc})` }}
                                    />
                                </div>
                                <div className='position text-center'>
                                    <div className='section-content'>Phó Giáo sư, Tiến sĩ Kiều Đình Tùng</div>
                                    <span className='section-infor'>Thần kinh, Cột sống, Ngoại thần kinh</span>
                                </div>
                            </div>
                        </div>

                        <div className='section-customize'>
                            <div className="outline">
                                <div className="outder-bg">
                                    <div className='bg-image'
                                        style={{ backgroundImage: `url(${BvVietDuc})` }}
                                    />
                                </div>
                                <div className='position text-center'>
                                    <div className='section-content'>Phó Giáo sư, Tiến sĩ Kiều Đình Tùng</div>
                                    <span className='section-infor'>Thần kinh, Cột sống, Ngoại thần kinh</span>
                                </div>
                            </div>
                        </div>

                        <div className='section-customize'>
                            <div className="outline">
                                <div className="outder-bg">
                                    <div className='bg-image'
                                        style={{ backgroundImage: `url(${BvVietDuc})` }}
                                    />
                                </div>
                                <div className='position text-center'>
                                    <div className='section-content'>Phó Giáo sư, Tiến sĩ Kiều Đình Tùng</div>
                                    <span className='section-infor'>Thần kinh, Cột sống, Ngoại thần kinh</span>
                                </div>
                            </div>
                        </div>

                        <div className='section-customize'>
                            <div className="outline">
                                <div className="outder-bg">
                                    <div className='bg-image'
                                        style={{ backgroundImage: `url(${BvVietDuc})` }}
                                    />
                                </div>
                                <div className='position text-center'>
                                    <div className='section-content'>Phó Giáo sư, Tiến sĩ Kiều Đình Tùng</div>
                                    <span className='section-infor'>Thần kinh, Cột sống, Ngoại thần kinh</span>
                                </div>
                            </div>
                        </div>

                    </Slider>
                </div>


            </div>
        </div>
    )
}


export default OutStandingDoctor;