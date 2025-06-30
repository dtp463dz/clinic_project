import './MedicalFacility.scss';
import Slider from "react-slick";
import BvVietDuc from '../../../assets/medical/benhvienvietduc.jpg'
import { useEffect, useState } from 'react';
import { getAllClinic } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';

const MedicalFacility = (props) => {
    const [dataClinic, setDataClinic] = useState([])
    const navigate = useNavigate();

    // view more


    //
    useEffect(() => {
        const fetchAllClinic = async () => {
            try {
                let res = await getAllClinic();
                if (res && res.errCode === 0) {
                    setDataClinic(res.data.clinics ? res.data.clinics : [])
                }
                console.log('check fetchAllClinic: ', res);
            } catch (error) {
                console.error('Failed all clinic:', error);
            }
        };
        fetchAllClinic()

    }, [])

    const handleViewDetailClinic = (clinic) => {
        navigate(`/detail-clinic/${clinic.id}`)
    }

    return (
        <div className='section-medical'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cơ sở y tế</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>
                        {dataClinic && dataClinic.length > 0 &&
                            dataClinic.map((item, index) => {
                                return (
                                    <div className='section-customize' key={index.id} onClick={() => handleViewDetailClinic(item)}>
                                        <div className="outline clinic-child">
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


export default MedicalFacility;