import './Specialty.scss';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Coxuongkhop from '../../../assets/Specialty/co-xuong-khop.png'
const Specialty = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // hien thi options
        slidesToScroll: 1, // số lần next 
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />
    };
    return (
        <div className='section-specialty'>
            <div className='specialty-container'>
                <div className='specialty-header'>
                    <span className='title-section'>Chuyên khoa phổ biến</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='specialty-body'>
                    <Slider {...settings}>
                        <div className='specialty-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='specialty-content'>Cơ xương khớp 1</div>
                            </div>

                        </div>
                        <div className='specialty-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='specialty-content'>Cơ xương khớp 2</div>
                            </div>
                        </div>
                        <div className='specialty-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='specialty-content'>Cơ xương khớp 3</div>
                            </div>
                        </div>
                        <div className='specialty-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='specialty-content'>Cơ xương khớp 4</div>
                            </div>
                        </div>
                        <div className='specialty-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='specialty-content'>Cơ xương khớp 5</div>
                            </div>
                        </div>
                        <div className='specialty-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='specialty-content'>Cơ xương khớp 6</div>
                            </div>
                        </div>
                    </Slider>
                </div>


            </div>
        </div>
    )
}


export default Specialty;