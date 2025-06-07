import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { NumericFormat } from 'react-number-format';


const ProfileDoctor = (props) => {
    const [dataProfile, setDataProfile] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let data = await getInforDoctor(props.doctorId);
            setDataProfile(data);
            console.log('check data profile: ', data);
        };

        fetchData();
    }, [props.doctorId]);

    const getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    const getDoctorImage = () => {
        if (dataProfile.image && dataProfile.image.type === 'Buffer' && dataProfile.image.data) {
            const imageBase64 = dataProfile.image
                ? Buffer.from(dataProfile.image, 'base64').toString('binary')
                : '';
            return imageBase64;
        }
    }
    let nameDetailDoctor = `${dataProfile.positionData?.valueVi} ${dataProfile.firstName} ${dataProfile.lastName}`;
    console.log('check price', dataProfile?.Doctor_Infor?.priceTypeData?.valueVi);
    return (
        <div className="profile-doctor-container">
            <div className="intro-doctor">
                <div className="content-left">
                    <div className="img-detail-doctor" >
                        {dataProfile && dataProfile.image ?
                            <img src={getDoctorImage()} alt="Doctor Image" />
                            :
                            " "
                        }
                    </div>


                    <div className="schedule-doctor">



                    </div>
                </div>
                <div className="content-right">
                    <div className="position-doctor">
                        {dataProfile && dataProfile.positionData &&
                            <h1 className="name-detail-doctor">{nameDetailDoctor} </h1>
                        }
                    </div>
                    <div className="introduce-detail-doctor">
                        <div className="introduce-title">
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                <span>{dataProfile.Markdown.description}</span>
                            }
                        </div>
                    </div>
                </div>

            </div>
            <div className="price">
                <span>Giá Khám : </span>
                <NumericFormat
                    value={dataProfile?.Doctor_Infor?.priceTypeData?.valueVi}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'VND'}
                    className="currency"
                />
            </div>
        </div>
    );
};

export default ProfileDoctor;
