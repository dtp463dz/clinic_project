import { useState, useEffect } from "react";
import HomeHeader from "../../HomeHeader";
import Slogan from "../../Slogan";
import "./ViewMoreDoctor.scss"
import { getTopDoctorHomeService } from "../../../../services/userService";
import { Buffer } from 'buffer';

const ViewMoreDoctor = () => {
    const [dataDoctor, setDataDoctor] = useState([]);

    useEffect(() => {
        const fetchAllSpecialty = async () => {
            try {
                let res = await getTopDoctorHomeService('');
                if (res && res.errCode === 0) {
                    setDataDoctor(res.data ? res.data : []);
                }
                console.log("check fetchAllSpecialty: ", res);
            } catch (error) {
                console.error("Failed all specialty:", error);
            }
        };
        fetchAllSpecialty();
    }, []);
    return (
        <>
            <Slogan />
            <HomeHeader />
            <div className="view-more-container">
                <h2>Bác sĩ</h2>
                <div className="doctor-grid">
                    {dataDoctor && dataDoctor.length > 0
                        && dataDoctor.map((item, index) => {
                            if (!item.image) return;

                            // Chuyển đổi ảnh từ buffer base64 sang dạng nhị phân để preview
                            const imageBase64 = item.image
                                ? Buffer.from(item.image, 'base64').toString('binary')
                                : '';
                            let name = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                            return (
                                <div className="doctor-item" key={index}>
                                    <img src={imageBase64} alt={name} />
                                    <div className='name-doctor'>{name || 'Unknown Doctor'}</div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    );
};

export default ViewMoreDoctor;