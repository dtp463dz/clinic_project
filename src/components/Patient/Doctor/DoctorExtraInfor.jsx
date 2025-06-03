import { useState } from "react";
import "./DoctorExtraInfor.scss";

const DoctorExtraInfor = (props) => {
    const [isShowDetailInfor, setIsShowDetailInfor] = useState(false);

    const showHideDetailInfor = (status) => {
        setIsShowDetailInfor(status)
    }
    return (
        <div className="doctor-extra-infor-container">
            <div className="content-up">
                <div className="text-address">Địa chỉ phòng khám</div>
                <div className="name=clinic">Phòng khám chuyên khoa da liễu</div>
                <div className="detail-address">207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
            </div>
            <div className="content-down">
                {isShowDetailInfor === false ?
                    <div className="view-detail">
                        <div>GIÁ KHÁM: 250.000đ. </div>
                        <span onClick={() => showHideDetailInfor(true)}>Xem chi tiết</span>
                    </div>
                    :
                    <>
                        <div className="title-price">Giá Khám: </div>
                        <div className="detail-infor">
                            <div>
                                <span className="left">Giá khám</span>
                                <span className="right">Giá khám</span>
                            </div>
                            <div>Mô tả</div>
                        </div>
                        <div className="payment">LOẠI BẢO HIỂM ÁP DỤNG.</div>
                        <div className="hide-price">
                            <span onClick={() => showHideDetailInfor(false)}>Ẩn bảng giá</span>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default DoctorExtraInfor;