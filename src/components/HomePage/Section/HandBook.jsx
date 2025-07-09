import './HandBook.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllHandBook } from '../../../services/handbookService';


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

const HandBook = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    // state
    const [dataHandBook, setDataHandBook] = useState([])
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate('/view-more-handbook');
    }
    const handleViewDetailHandBook = (handbook) => {
        navigate(`/detail-handbook/${handbook.id}`)
    }

    useEffect(() => {
        const fetchAllHandBook = async () => {
            try {
                let res = await getAllHandBook();
                if (res && res.errCode === 0) {
                    setDataHandBook(res.data.handbooks ? res.data.handbooks : [])
                }
                console.log('check fetchAllHandBook: ', res);
            } catch (error) {
                console.error('Failed all handbook:', error);
            }
        };
        fetchAllHandBook();
    }, [])

    return (
        <div className='section-handbook'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cẩm nang</span>
                    <button className='btn-section' onClick={() => handleViewMore()}>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...settings}>
                        {dataHandBook && dataHandBook.length > 0 &&
                            dataHandBook.map((item, index) => {
                                return (
                                    <div className='section-customize' key={index.id} onClick={() => handleViewDetailHandBook(item)}>
                                        <div className="outline handbook-child">
                                            <div className='bg-image'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='section-content section-name'>{item.title}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default HandBook;