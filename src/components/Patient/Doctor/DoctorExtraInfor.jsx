import { useEffect, useState } from "react";
import "./DoctorExtraInfor.scss";
import { getExtraInforDoctorById } from "../../../services/userService";
import { NumericFormat } from 'react-number-format';

const DoctorExtraInfor = (props) => {
    const [isShowDetailInfor, setIsShowDetailInfor] = useState(false);
    const [extraInfor, setExtraInfor] = useState({});

    const showHideDetailInfor = (status) => {
        setIsShowDetailInfor(status)
    }
    useEffect(() => {
        const fetchExtraInfor = async () => {
            if (props.doctorIdFromParent && props.doctorIdFromParent !== -1) {
                let res = await getExtraInforDoctorById(props.doctorIdFromParent);
                if (res && res.errCode === 0) {
                    setExtraInfor(res.data)
                }
                console.log('check res doctor extra: ', res)
            }
        };
        fetchExtraInfor();

    }, [props.doctorIdFromParent])
    console.log('check extra', extraInfor)
    return (
        <div className="doctor-extra-infor-container">
            <div className="content-up">
                <div className="text-address">Địa chỉ phòng khám</div>
                <div className="name=clinic">{extraInfor?.nameClinic || ""}</div>
                <div className="detail-address">{extraInfor?.addressClinic || ""}</div>
            </div>
            <div className="content-down">
                {isShowDetailInfor === false ?
                    <div className="view-detail">
                        <div className="title-price">
                            GIÁ KHÁM :
                            <NumericFormat
                                value={extraInfor?.priceTypeData?.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                                className="currency"
                            />
                        </div>
                        <span className="view-more" onClick={() => showHideDetailInfor(true)}>Xem chi tiết</span>
                    </div>
                    :
                    <>
                        <div className="view-detail">
                            <div className="title-price">
                                GIÁ KHÁM :
                                <NumericFormat
                                    value={extraInfor?.priceTypeData?.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                    className="currency"
                                />
                            </div>
                            <div className="detail-infor">
                                <div className="note">{extraInfor?.note}</div>
                                <div className="payment">Người bệnh có thể thanh toán bằng hình thức: {extraInfor?.paymentTypeData?.valueVi || ""}</div>

                            </div>
                            <div className="hide-price">
                                <span onClick={() => showHideDetailInfor(false)}>Ẩn bảng giá</span>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default DoctorExtraInfor;