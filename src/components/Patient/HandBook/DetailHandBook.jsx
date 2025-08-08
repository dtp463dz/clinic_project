import { useParams } from 'react-router-dom';
import './DetailHandBook.scss';
import { useEffect, useState } from 'react';
import { getDetailHandBookById } from '../../../services/handbookService';
import _ from 'lodash';
import Slogan from '../../HomePage/Slogan';
import HomeHeader from '../../HomePage/HomeHeader';
const DetailHandBook = () => {
    const { id } = useParams();
    const [dataHandBook, setDataHandBook] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            const fetchDetailHandBook = async () => {
                let res = await getDetailHandBookById({
                    id: id,
                });
                setDataHandBook(res.data);
            }
            fetchDetailHandBook();
        };

    }, [id])

    return (
        <>
            <div className="detail-handbook-container">
                {dataHandBook && !_.isEmpty(dataHandBook) && (
                    <>
                        <div className="handbook-banner" style={{ backgroundImage: `url(${dataHandBook.image})` }}>
                            {/* Nội dung banner nếu cần (ví dụ: overlay text) */}
                        </div>
                        <div className="handbook-content">
                            <div className="container">
                                <h1 className="handbook-title">
                                    {dataHandBook.title || 'Tiêu đề không có'}
                                </h1>
                                <div className="meta-info">
                                    <span>
                                        Ngày đăng:{' '}
                                        {new Date(
                                            parseInt(dataHandBook.publicationDate)
                                        ).toLocaleDateString('vi-VN') || 'Chưa cập nhật'}
                                    </span>{' '}
                                    |{' '}
                                    <span>
                                        Tác giả: {dataHandBook.author || 'Không rõ'}
                                    </span>
                                </div>
                                <div
                                    className="content-body"
                                    dangerouslySetInnerHTML={{
                                        __html: dataHandBook.descriptionHTML,
                                    }}
                                />
                                <button className="appointment-btn">
                                    Đặt lịch khám ngay
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div >
        </>

    )
}

export default DetailHandBook