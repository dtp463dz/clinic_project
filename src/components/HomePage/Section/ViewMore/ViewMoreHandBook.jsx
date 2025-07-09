import { useState, useEffect } from "react";
import { getAllHandBook } from "../../../../services/handbookService";
import "./ViewMoreHandBook.scss";
import { useNavigate } from 'react-router-dom';

const ViewMoreHandBook = () => {
    const [dataHandBook, setDataHandBook] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllSpecialty = async () => {
            try {
                let res = await getAllHandBook();
                if (res && res.errCode === 0) {
                    setDataHandBook(res.data.handbooks ? res.data.handbooks : []);
                }
            } catch (error) {
                console.error("Failed all handbook:", error);
            }
        };
        fetchAllSpecialty();
    }, []);
    const handleViewDetailHandBook = (handbook) => {
        navigate(`/detail-handbook/${handbook.id}`)
    }
    return (
        <>
            <div className="view-more-container">
                <h2>Cẩm Nang Y Tế</h2>
                <div className="handbook-list">
                    {dataHandBook.map((item) => (
                        <div className="handbook-item" key={item.id} onClick={() => handleViewDetailHandBook(item)}>
                            <img src={item.image} alt={item.title} />
                            <div className="handbook-content">
                                <h3>{item.title}</h3>
                                <p>Tác giả: {item.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ViewMoreHandBook