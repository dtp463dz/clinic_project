import './Specialty.scss';
// Import css files
import Slider from "react-slick";
import Coxuongkhop from '../../../assets/Specialty/co-xuong-khop.png'
const Specialty = (props) => {

    return (
        <div className='section-specialty'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Chuyên khoa phổ biến</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='section-content'>Cơ xương khớp 1</div>
                            </div>

                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='section-content'>Cơ xương khớp 2</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='section-content'>Cơ xương khớp 3</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='section-content'>Cơ xương khớp 4</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='section-content'>Cơ xương khớp 5</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className="outline">
                                <div className='bg-image'
                                    style={{ backgroundImage: `url(${Coxuongkhop})` }}
                                />
                                <div className='section-content'>Cơ xương khớp 6</div>
                            </div>
                        </div>
                    </Slider>
                </div>


            </div>
        </div>
    )
}


export default Specialty;