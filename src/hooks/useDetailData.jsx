import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailSymptomById, getDetailDrugById, getDetailMedicinalById, getDetailBodyPartById } from '../services/medicalDataService';
const useDetailData = (type) => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response;
                switch (type) {
                    case 'symptoms':
                        response = await getDetailSymptomById({ id });
                        break;
                    case 'drugs':
                        response = await getDetailDrugById({ id });
                        break;
                    case 'herbs':
                        response = await getDetailMedicinalById({ id });
                        break;
                    case 'bodyParts':
                        response = await getDetailBodyPartById({ id });
                        break;
                    default:
                        throw new Error('Invalid type');
                }
                if (response && response.errCode === 0) {
                    setData(response.data);
                } else {
                    setError('Không tìm thấy dữ liệu');
                }

            } catch (error) {
                console.error('Error useDetailData: ', error)
                setError('Lỗi khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id, type])
    return { data, loading, error };
}

export default useDetailData;