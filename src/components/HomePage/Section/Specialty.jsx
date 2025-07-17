import './Specialty.scss';
// Import css files
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { getAllSpecialty } from "../../../services/userService";

import { useNavigate } from 'react-router-dom';

const Specialty = (props) => {

    const [dataSpecialty, setDataSpecialty] = useState([])
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate('/view-more-specialty');
    }

    useEffect(() => {
        const fetchAllSpecialty = async () => {
            try {
                let res = await getAllSpecialty();
                if (res && res.errCode === 0) {
                    setDataSpecialty(res.data.specialties ? res.data.specialties : [])
                }
                //console.log('check fetchAllSpecialty: ', res);
            } catch (error) {
                console.error('Failed all specialty:', error);
            }
        };
        fetchAllSpecialty()

    }, [])

    const handleViewDetailSpecialty = (specialty) => {
        navigate(`/detail-specialty/${specialty.id}`)
    }

    return (
        <div className='section-specialty'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Chuyên khoa phổ biến</span>
                    <button className='btn-section' onClick={() => handleViewMore()}>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div className='section-customize ' key={index.id} onClick={() => handleViewDetailSpecialty(item)}>
                                        <div className="outline specialty-child" >
                                            <div className='bg-image'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='section-content section-name'>{item.name}</div>
                                        </div>

                                    </div>
                                )
                            })
                        }



                    </Slider>
                </div>


            </div>
        </div>
    )
}


export default Specialty;