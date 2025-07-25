import CustomDatePicker from "../../../Input/CustomDatePicker";
import "./ManagePatient.scss";
import { useCallback, useEffect, useState } from 'react';
import { cancelConfirm, getListPatientForDoctor, postSendConfirm } from "../../../../services/userService";
import { useSelector } from "react-redux";
import dayjs from 'dayjs'; // su dung de set thoi gian ve 00:00:00
import Pagination from "../../../Pagination/Pagination";
import ConFirmModal from "./ConFirmModal";
import { toast } from 'react-toastify';
import PrintInvoiceModal from "./PrintInvoiceModal";
import CancelConfirmModal from "./CancelConfirmModal";

const ManagePatient = () => {
    const user = useSelector(state => state.user.account);
    console.log('check user: ', user);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dataPatient, setDataPatient] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isSending, setIsSending] = useState(false);

    // modal
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalPrint, setShowModalPrint] = useState(false);
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [dataModalPrint, setDataModalPrint] = useState({});
    const [dataModalCancel, setDataModalCancel] = useState({});
    const pageSize = 10;
    // on change datepicker
    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date);
        setCurrentPage(1);
    }
    const fetchListPatient = useCallback(async () => {
        const formattedDate = dayjs(currentDate).startOf('day').valueOf();
        // console.log('check res formattedDate: ', formattedDate)
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
            page: currentPage,
            limit: pageSize,
        })
        if (res && res.errCode === 0) {
            setDataPatient(res.data.data)
            setPagination(res.data.pagination)
        } else {
            setDataPatient([])
            setPagination({})
        }
    }, [user, currentDate, currentPage, pageSize]);
    useEffect(() => {
        fetchListPatient()
    }, [fetchListPatient])

    const handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            bookingId: item.id
        }
        setShowModalConfirm(true)
        setDataModal(data)
    }
    // in hóa đơn 
    const handlePrintInvoices = (item) => {
        let data = {
            patientName: item.patientData.firstName,
            patientEmail: item.patientData.email,
            patientPhone: item.patientData.phoneNumber || 'N/A',
            patientAddress: item.patientData.address || 'N/A',
            gender: item.patientData.genderData?.valueVi || 'N/A',
            bookingId: item.id,
            bookingDate: dayjs(currentDate).format('DD/MM/YYYY'),
            timeType: item.timeTypeDataPatient?.valueVi || 'N/A',
            doctorName: user.firstName + ' ' + user.lastName || 'N/A',
            clinicName: user.clinicName || 'N/A',
            clinicAddress: user.clinicAddress || 'N/A',
        };
        // console.log('Dữ liệu gửi modal in:', data); // Debug bookingId
        setDataModalPrint(data);
        setShowModalPrint(true);
    }
    const handlePageChange = (page) => {
        setCurrentDate(page);
    }
    const handleSend = async (dataChildFromModal) => {
        // console.log('Image to BE:', dataChildFromModal.image);
        // console.log('PDF to BE: ', dataChildFromModal.pdfBase64);

        let res = await postSendConfirm({
            email: dataChildFromModal.email,
            image: dataChildFromModal.image,
            pdfBase64: dataChildFromModal.pdfBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
        });

        if (res && res.errCode === 0) {
            toast.success('Xác nhận lưu hóa đơn khám bệnh thành công')
            setShowModalConfirm(false)
            await fetchListPatient(); // update lại danh sách
        } else {
            toast.error('Xác nhận lưu hóa đơn khám bệnh thất bại')
            console.log('Lỗi lưu hóa đơn: ', res)
        }
    }
    const handleCancelButton = async (item) => {
        let data = {
            bookingId: item.id,
            doctorId: user.id,
            patientName: item.patientData.firstName,
            timeType: item.timeTypeDataPatient?.valueVi || 'N/A',
            bookingDate: dayjs(currentDate).format('DD/MM/YYYY')
        };
        setDataModalCancel(data);
        setShowModalCancel(true);
    };
    const handleCancelConfirm = async (data) => {
        const res = await cancelConfirm(user.accessToken, data.bookingId, data.doctorId);
        if (res && res.errCode === 0) {
            await fetchListPatient(); // Làm mới danh sách bệnh nhân
        } else {
            toast.error(res.errMessage || 'Hủy lịch hẹn thất bại');
        }
    };
    return (
        <div className="manage-patient-container ">
            <div className="m-p-title h4 px-4 py-2">
                Quản lý bệnh nhân khám bệnh
            </div>
            <div className="manage-patient-body row">
                <div className="col-6 form-group">
                    <label className="mx-3">Chọn ngày khám</label>
                    <br />
                    <CustomDatePicker onChange={handleOnChangeDatePicker} />
                </div>
                <div className="col-12 table-manage-patient mx-3">
                    <table className="table table-hover table-bordered ">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Họ Tên</th>
                                <th scope="col">Địa Chỉ</th>
                                <th scope="col">Giới Tính</th>
                                <th scope="col">Thời Gian Đặt</th>
                                <th scope="col">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPatient && dataPatient.length > 0 ? (
                                dataPatient.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item?.patientData?.firstName}</td>
                                        <td>{item?.patientData?.address}</td>
                                        <td>{item?.patientData?.genderData?.valueVi}</td>
                                        <td>{item?.timeTypeDataPatient?.valueVi}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleBtnConfirm(item)}
                                            >Xác Nhận</button>
                                            <button
                                                className="btn btn-secondary mx-2"
                                                onClick={() => handlePrintInvoices(item)}
                                            >
                                                In Hóa Đơn
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleCancelButton(item)}
                                            >
                                                Hủy Lịch Hẹn
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Không có bệnh nhân</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {pagination.totalPages >= 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={pagination.totalPages || 1}
                            onPageChange={handlePageChange}
                        />
                    )}
                    <ConFirmModal
                        show={showModalConfirm}
                        setShow={setShowModalConfirm}
                        dataModal={dataModal}
                        sendConfirm={handleSend}
                        isSending={isSending}
                        setIsSending={setIsSending}
                    />
                    <PrintInvoiceModal
                        show={showModalPrint}
                        setShow={setShowModalPrint}
                        dataModal={dataModalPrint}
                    />
                    <CancelConfirmModal
                        show={showModalCancel}
                        setShow={setShowModalCancel}
                        dataModal={dataModalCancel}
                        handleCancelConfirm={handleCancelConfirm}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManagePatient;