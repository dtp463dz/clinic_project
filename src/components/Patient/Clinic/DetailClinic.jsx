
import { useEffect, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import Slogan from "../../HomePage/Slogan";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailClinicById } from "../../../services/userService";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";


const DetailClinic = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataDetailClinic, setDataDetailClinic] = useState({});

    useEffect(() => {
        if (id) {
            const fetchDetailSpecialty = async () => {
                let res = await getDetailClinicById({
                    id: id,
                });
                console.log("check res fetchDetailSpecialty: ", res)
                if (res && res.errCode === 0) {
                    let data = res.data;
                    let arrDoctorId = []
                    if (data && !_.isEmpty(res.data)) {
                        let arr = data.doctorClinic;
                        if (arr && arr.length > 0) {
                            arr.map(item => {
                                arrDoctorId.push(item.doctorId)
                            })
                        }
                    }


                    setDataDetailClinic(res.data) // chi tiet phong kham
                    setArrDoctorId(arrDoctorId) // chi tiet bac si thuoc chuyen khoa
                }
            }
            fetchDetailSpecialty();
        }
    }, [id])
    console.log(arrDoctorId)

    return (
        <div className="detail-specialty-container">
            <Slogan />
            <HomeHeader />
            <div className="detail-specialty-body">
                <div className="description-specialty">
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                        &&
                        <>
                            <div>{dataDetailClinic.name}</div>
                            <div>{dataDetailClinic.address}</div>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                        </>
                    }

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
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
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

export default DetailClinic