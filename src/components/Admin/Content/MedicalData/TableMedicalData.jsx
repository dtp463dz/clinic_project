import { useEffect, useState } from "react"
import useCreateMedicalData from "../../../../hooks/useCreateMedicalData";
import { toast } from 'react-toastify';
import Pagination from "../../../Pagination/Pagination";

const TableMedicalData = ({ entityType, refreshTable }) => {
    const [dataList, setDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);
    const { getAllData } = useCreateMedicalData();

    const entityLabels = {
        symptoms: { label: 'Triệu chứng', dataKey: 'symptoms' },
        drugs: { label: 'Thuốc', dataKey: 'drugs' },
        herbs: { label: 'Dược liệu', dataKey: 'herbs' },
        bodyParts: { label: 'Bộ phận cơ thể', dataKey: 'bodyParts' },
    }

    useEffect(() => {
        fetchData();
    }, [entityType, currentPage, refreshTable])

    const fetchData = async () => {
        try {
            const res = await getAllData(entityType, currentPage, limit);
            if (res && res.errCode === 0) {
                const dataKey = entityLabels[entityType]?.dataKey || '';
                setDataList(res.data[dataKey] || []);
                setTotalPages(res.data.totalPages || 1);
            } else {
                toast.error(`Lỗi khi lấy danh sách ${entityLabels[entityType]?.label || 'dữ liệu'}`);
            }

        } catch (error) {
            toast.error(`Lỗi khi lấy danh sách ${entityLabels[entityType]?.label || 'dữ liệu'}`);
            console.error(error);
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="table-medical-data">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Ảnh</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList && dataList.length > 0 ? (
                        dataList.map((item, index) => (
                            <tr key={index}>
                                <td>{(currentPage - 1) * limit + index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                                        />
                                    ) : (
                                        "Không có ảnh"
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default TableMedicalData