import { useState, useEffect } from "react";
import HomeHeader from "../../HomeHeader";
import Slogan from "../../Slogan";
import { getAllClinic } from "../../../../services/userService";
import "./ViewMoreClinic.scss"
const ViewMoreClinic = () => {
    const [dataClinic, setDataClinic] = useState([]);

    useEffect(() => {
        const fetchAllClinic = async () => {
            try {
                let res = await getAllClinic();
                if (res && res.errCode === 0) {
                    setDataClinic(res.data.clinics ? res.data.clinics : []);
                }
                console.log("check fetchAllClinic: ", res);
            } catch (error) {
                console.error("Failed all clinic:", error);
            }
        };
        fetchAllClinic();
    }, []);
    return (
        <>
            <Slogan />
            <HomeHeader />
            <div className="view-more-container">
                <h2>Chuyên Khoa</h2>
                <div className="clinic-grid">
                    {dataClinic.map((item, index) => (
                        <div className="clinic-item" key={index.id}>
                            <img src={item.image} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ViewMoreClinic