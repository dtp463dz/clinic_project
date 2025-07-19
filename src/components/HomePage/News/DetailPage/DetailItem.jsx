import useDetailData from '../../../../hooks/useDetailData';
import Footer from '../Footer';
import HeaderNews from '../HeaderNews/HeaderNews';
import './DetailItem.scss';

const DetailItem = () => {
    // Ánh xạ route sang type
    const getTypeFromPath = () => {
        const path = window.location.pathname.split('/')[1];
        switch (path) {
            case 'symptoms':
                return 'symptoms';
            case 'drugs':
                return 'drugs';
            case 'herbs':
                return 'herbs';
            case 'bodyParts':
                return 'bodyParts';
            default:
                return 'symptoms'; // Giá trị mặc định
        }
    };

    const type = getTypeFromPath();
    const { data, loading, error } = useDetailData(type);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;

    const title = data.name || `Chi tiết ${type === 'herb' ? 'dược liệu' : type}`;
    const descriptionHTML = data.descriptionHTML || 'Chưa có mô tả';
    const image = data.image || '/path/to/default-image.png'; // Hình ảnh mặc định hoặc từ API

    return (
        <>
            <HeaderNews />
            <div className="detail-item-container">
                <div className="intro-item">
                    <div className="content-right">
                        <div className="position-item">
                            <h3>Chi tiết {title}</h3>
                        </div>
                        <div className="introduce-detail-item">
                            <div className="introduce-title" dangerouslySetInnerHTML={{ __html: descriptionHTML }}></div>
                        </div>
                    </div>
                </div>
                <div className="additional-info">
                    {type === 'symptom' && <img src={image} alt="Minh họa" />}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailItem;