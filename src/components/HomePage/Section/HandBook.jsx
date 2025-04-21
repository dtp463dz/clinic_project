import './HandBook.scss';
import Slider from "react-slick";
import ChiPhiHutMo from '../../../assets/HandBook/chiphihutmotay.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcNext, FcPrevious } from "react-icons/fc";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="custom-arrow custom-next"
            onClick={onClick}
        >
            <FcNext />
        </button>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="custom-arrow custom-prev"
            onClick={onClick}
        >
            <FcPrevious />
        </button>
    );
}

const HandBook = (props) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className='section-handbook'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cẩm nang</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...settings}>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${ChiPhiHutMo})` }}
                                />
                                <div className='section-content'>Chi phí hút mỡ bắp tay tại các địa chỉ uy tín Hà Nội là bao nhiêu?</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${ChiPhiHutMo})` }}
                                />
                                <div className='section-content'>Chi phí hút mỡ bắp tay tại các địa chỉ uy tín Hà Nội là bao nhiêu?</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${ChiPhiHutMo})` }}
                                />
                                <div className='section-content'>Chi phí hút mỡ bắp tay tại các địa chỉ uy tín Hà Nội là bao nhiêu?</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${ChiPhiHutMo})` }}
                                />
                                <div className='section-content'>Chi phí hút mỡ bắp tay tại các địa chỉ uy tín Hà Nội là bao nhiêu?</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${ChiPhiHutMo})` }}
                                />
                                <div className='section-content'>Chi phí hút mỡ bắp tay tại các địa chỉ uy tín Hà Nội là bao nhiêu?</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${ChiPhiHutMo})` }}
                                />
                                <div className='section-content'>Chi phí hút mỡ bắp tay tại các địa chỉ uy tín Hà Nội là bao nhiêu?</div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default HandBook;