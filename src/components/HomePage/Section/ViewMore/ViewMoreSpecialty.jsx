import { useState, useEffect } from "react";
import HomeHeader from "../../HomeHeader";
import Slogan from "../../Slogan";
import { getAllSpecialty } from "../../../../services/userService";
import "./ViewMoreSpecialty.scss"
const ViewMoreSpecialty = () => {
    const [dataSpecialty, setDataSpecialty] = useState([]);

    useEffect(() => {
        const fetchAllSpecialty = async () => {
            try {
                let res = await getAllSpecialty();
                if (res && res.errCode === 0) {
                    setDataSpecialty(res.data.specialties ? res.data.specialties : []);
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
                <h2>Chuyên Khoa</h2>
                <div className="specialty-grid">
                    {dataSpecialty.map((item, index) => (
                        <div className="specialty-item" key={index.id}>
                            <img src={item.image} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ViewMoreSpecialty;