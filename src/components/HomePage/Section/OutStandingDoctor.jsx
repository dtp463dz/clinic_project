import './OutStandingDoctor.scss';
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopDoctor } from "../../../redux/action/adminAction";
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';

const OutStandingDoctor = (props) => {
    const [arrDoctors, setArrDoctors] = useState([]);
    const navigate = useNavigate();

    // state redux
    const topDoctorRedux = useSelector((state) => state.admin.topDoctors)
    // console.log('check topDoctorRedux: ', topDoctorRedux)
    const dispatch = useDispatch();
    // did mount
    useEffect(() => {
        dispatch(fetchTopDoctor());
    }, [dispatch]);

    // did update
    useEffect(() => {
        if (topDoctorRedux && topDoctorRedux.length > 0) {
            setArrDoctors(topDoctorRedux)
        }
    }, [topDoctorRedux])

    // view detail doctor
    const handleViewDetailDoctor = (doctor) => {
        navigate(`/detail-doctor/${doctor.id}`)
    }
    return (
        <div className='section-doctor'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Bác sĩ nổi bật</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...props.settings}>

                        {arrDoctors && arrDoctors.length > 0
                            && arrDoctors.map((item, index) => {

                                if (!item.image) return;

                                // Chuyển đổi ảnh từ buffer base64 sang dạng nhị phân để preview
                                const imageBase64 = item.image
                                    ? Buffer.from(item.image, 'base64').toString('binary')
                                    : '';
                                let name = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                return (

                                    <div className='section-customize' key={index} onClick={() => handleViewDetailDoctor(item)}>
                                        <div className="outline">
                                            <div className="outder-bg">
                                                <div className='bg-image'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                />
                                            </div>
                                            <div className='position text-center'>
                                                <div className='section-content'>{name || 'Unknown Doctor'}</div>
                                                <span className='section-infor'>Thần kinh, Cột sống, Ngoại thần kinh</span>
                                            </div>
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


export default OutStandingDoctor;