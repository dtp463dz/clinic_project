import { useParams } from "react-router-dom";
import Slogan from "../../HomePage/Slogan";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";

import { useState } from "react";
import "./DetailSpecialty.scss"
const DetailSpecialty = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [arrDoctorId, setArrDoctorId] = useState([45, 46, 38])

    return (
        <div className="detail-specialty-container">
            <Slogan />
            <HomeHeader />
            <div className="detail-specialty-body">


                <div className="description-specialty">

                </div>
                {arrDoctorId && arrDoctorId.length > 0 &&
                    arrDoctorId.map((doctorId, index) => {
                        return (
                            <div className="each-doctor" key={index}>
                                <div className="dt-content-left">
                                    <div className="profile-doctor">
                                        <ProfileDoctor
                                            doctorId={doctorId}
                                            isShowDescriptionDoctor={false} // open description
                                        // dataTime={dataTime}
                                        />
                                    </div>
                                </div>
                                <div className="dt-content-right">
                                    <div className="doctor-schedule">
                                        <DoctorSchedule
                                            doctorIdFromParent={doctorId}
                                        />
                                    </div>
                                    <div className="doctor-extra-infor">
                                        <DoctorExtraInfor
                                            doctorIdFromParent={doctorId}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>


        </div>
    )
}

export default DetailSpecialty;