import { useParams } from "react-router-dom";
import Slogan from "../../HomePage/Slogan";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";

import { useEffect, useState } from "react";
import "./DetailSpecialty.scss";
import { getDetailSpecialtyById } from "../../../services/userService";
import { getAllCodeService } from "../../../services/apiService";
import _ from "lodash";
import Select from 'react-select';

const DetailSpecialty = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataDetailSpecialty, setDataDetailSpecialty] = useState({})
    const [listProvince, setListProvince] = useState([])
    useEffect(() => {
        if (id) {
            const fetchDetailSpecialty = async () => {
                let res = await getDetailSpecialtyById({
                    id: id,
                    location: 'ALL'
                });
                let resProvince = await getAllCodeService('PROVINCE') // lay province ben allcode
                console.log("check res fetchDetailSpecialty: ", res)
                if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                    let data = res.data;
                    let arrDoctorId = []
                    if (data && !_.isEmpty(res.data)) {
                        let arr = data.doctorSpecialty;
                        if (arr && arr.length > 0) {
                            arr.map(item => {
                                arrDoctorId.push(item.doctorId)
                            })
                        }
                    }
                    setDataDetailSpecialty(res.data) // chi tiet chuyen khoa
                    setArrDoctorId(arrDoctorId) // chi tiet bac si thuoc chuyen khoa
                    setListProvince(resProvince.data) // tỉnh thành phố của bác sĩ
                }
            }
            fetchDetailSpecialty();
        }
    }, [id])

    console.log('check state: ', arrDoctorId, dataDetailSpecialty, listProvince)
    const handleOnChangeSelect = (e) => {
        console.log('check on change', e.target.value)
    }
    return (
        <div className="detail-specialty-container">
            <Slogan />
            <HomeHeader />
            <div className="detail-specialty-body">


                <div className="description-specialty">
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                        &&
                        <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                    }

                </div>
                <div className="search-sp-doctor">
                    <select onChange={(e) => handleOnChangeSelect(e)}>
                        {listProvince && listProvince.length > 0 &&
                            listProvince.map((item, index) => {
                                return (
                                    <option key={index.id} value={item.keyMap}>
                                        {item.valueVi}
                                    </option>
                                )
                            })
                        }
                    </select>

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