import CustomDatePicker from "../../../Input/CustomDatePicker";
import "./ManagePatient.scss";
import { format } from 'date-fns'; // format lai ngay
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { getListPatientForDoctor } from "../../../../services/userService";
import { useSelector } from "react-redux";
import dayjs from 'dayjs'; // su dung de set thoi gian ve 00:00:00

const ManagePatient = () => {
    const user = useSelector(state => state.user.account);
    console.log('user: ', user);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dataPatient, setDataPatient] = useState([]);

    // on change datepicker
    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date);
        // console.log('Selected date:', format(date, 'dd/MM/yyyy'), date.getTime());
    }

    useEffect(() => {
        const fetchListPatient = async () => {
            const formattedDate = dayjs(currentDate).startOf('day').valueOf();
            // console.log('check res formattedDate: ', formattedDate)
            let res = await getListPatientForDoctor({
                doctorId: user.id,
                date: formattedDate,
            })
            if (res && res.errCode === 0) {
                setDataPatient(res.data)
            }
        };
        fetchListPatient()
    }, [user, currentDate])

    console.log('check data patient: ', dataPatient)

    const handleBtnConfirm = () => {

    }
    const handleBtnRemedy = () => {

    }
    const handleBtnDelete = () => {

    }
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
                                dataPatient.map((patient, index) => (
                                    <tr key={patient.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{patient?.patientData?.firstName}</td>
                                        <td>{patient?.patientData?.address}</td>
                                        <td>{patient?.patientData?.genderData?.valueVi}</td>
                                        <td>{patient?.timeTypeDataPatient?.valueVi}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleBtnConfirm()}
                                            >Xác Nhận</button>
                                            <button
                                                className="btn btn-success mx-3"
                                                onClick={() => handleBtnRemedy()}
                                            >Gửi Hóa Đơn</button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleBtnDelete()}
                                            >Xóa</button>
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

                </div>
            </div>
        </div>
    )
}

export default ManagePatient;