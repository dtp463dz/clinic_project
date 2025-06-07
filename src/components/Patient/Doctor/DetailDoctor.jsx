import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Slogan from "../../HomePage/Slogan";
import HomeHeader from "../../HomePage/HomeHeader";
import './DetailDoctor.scss';
import FBImage from '../../../assets/doctor/facebook.png';
import ZaloImage from '../../../assets/doctor/zalo_icon.svg';
import PhoneImage from '../../../assets/doctor/whatsapp.png';
import { FaCalendarAlt } from "react-icons/fa";
import { getDetailInforDoctor } from "../../../services/userService";
import { Buffer } from 'buffer';
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import { useNavigate } from 'react-router-dom';


const DetailDoctor = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [detailDoctor, setDetailDoctor] = useState({});

    useEffect(() => {
        if (id) {
            fetchDetaiInforDoctor()
        }
    }, [id]);

    const fetchDetaiInforDoctor = async () => {
        let res = await getDetailInforDoctor(id);
        // console.log('>> check res fetch Detai Infor Doctor: ', res)
        if (res && res.errCode === 0) {
            setDetailDoctor(res.data);
        }
    }
    const getDoctorImage = () => {
        if (detailDoctor.image && detailDoctor.image.type === 'Buffer' && detailDoctor.image.data) {
            const imageBase64 = detailDoctor.image
                ? Buffer.from(detailDoctor.image, 'base64').toString('binary')
                : '';
            return imageBase64;
        }
    }
    const navigate = useNavigate();


    const handleBooking = () => {
        navigate('/')
    }

    // console.log('check state', detailDoctor)
    let nameDetailDoctor = `${detailDoctor.positionData?.valueVi} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    return (
        <>
            <Slogan />
            <HomeHeader isShowBanner={false} />
            <div className="doctor-detail-container">
                <div className="intro-doctor">
                    <div className="content-left">
                        <div className="img-detail-doctor" >
                            {detailDoctor && detailDoctor.image ?
                                <img src={getDoctorImage()} alt="Doctor Image" />
                                :
                                " "
                            }
                        </div>
                        <div className="contact-detail-doctor">
                            <img src={PhoneImage} alt="Zalo Icon" style={{ width: '10%' }} />
                            <img src={FBImage} alt="Facebook Icon" style={{ width: '10%' }} />
                            <img src={ZaloImage} alt="Zalo Icon" style={{ width: '10%' }} />
                        </div>
                        <div className="booking-doctor" onClick={handleBooking}>
                            <p className="booking-icon"><FaCalendarAlt /></p>
                            <p className="booking-text" > Đặt lịch ngay</p>
                        </div>
                        <div className="schedule-doctor">
                            <div className="schedule-content-up">
                                <DoctorSchedule
                                    doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                                />
                            </div>

                            <div className="schedule-content-down">
                                <div className="">
                                    <DoctorExtraInfor doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-right">
                        <div className="position-doctor">
                            {detailDoctor && detailDoctor.positionData &&
                                <h1 className="name-detail-doctor">{nameDetailDoctor} </h1>
                            }
                        </div>
                        <div className="introduce-detail-doctor">
                            <div className="introduce-title">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>{detailDoctor.Markdown.description}</span>
                                }
                            </div>

                            <div className="detail-infor-doctor">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                    <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="schedule-doctor">

                </div>

                <div className="comment-doctor">

                </div>
            </div>
        </>

    )
}

export default DetailDoctor;