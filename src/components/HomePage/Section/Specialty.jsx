import './Specialty.scss';
// Import css files
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { getAllSpecialty } from "../../../services/userService";

const Specialty = (props) => {

    const [dataSpecialty, setDataSpecialty] = useState([])

    useEffect(() => {
        const fetchAllSpecialty = async () => {
            try {
                let res = await getAllSpecialty();
                if (res && res.errCode === 0) {
                    setDataSpecialty(res.data ? res.data : [])
                }
                console.log('check fetchAllSpecialty: ', res);
            } catch (error) {
                console.error('Failed all specialty:', error);
            }
        };
        fetchAllSpecialty()

    }, [])

    return (
        <div className='section-specialty'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Chuyên khoa phổ biến</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div className='section-customize ' key={index.id}>
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