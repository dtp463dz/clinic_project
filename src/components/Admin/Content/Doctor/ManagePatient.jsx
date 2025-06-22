import CustomDatePicker from "../../../Input/CustomDatePicker";
import "./ManagePatient.scss";
import { format } from 'date-fns'; // format lai ngay
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const ManagePatient = () => {
    const [currentDate, setCurrentDate] = useState(new Date());


    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date);
        console.log('Selected date:', format(date, 'dd/MM/yyyy'), date.getTime());
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
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default ManagePatient;