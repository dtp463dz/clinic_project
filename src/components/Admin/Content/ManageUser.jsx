import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import TableUser from "./TableUser";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = () => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false); // modal create
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false); // modal update 
    const [showModalViewUser, setShowModalViewUser] = useState(false); // modal view 
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false); // modal delete
    const [dataUpdate, setDataUpdate] = useState({}); // update data
    const [dataView, setDataView] = useState({}); // view data
    const [dataDelete, setDataDelete] = useState({}); // delete data
    const [listUsers, setListUsers] = useState([]);
    // hàm này chạy sau khi hàm return chạy
    // componentDidMount
    useEffect(() => {
        // console.log('run second useEffect')
        // let res = await getAllUser()
        fetchListUsers();
    }, []);
    // api view all user
    const fetchListUsers = async () => {
        let res = await getAllUsers();
        // console.log('>> check res useEffect: ', res)
        if (res.errCode === 0) {
            setListUsers(res.users)
        }
    }

    //click button update user
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true); // modal mở
        setDataUpdate(user)
    }

    // reset lại phần modal update khi ấn close
    const resetUpdateData = () => {
        setDataUpdate({}); // cho về rỗng
    }

    // click button view user
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true); // click btn-view modal hiển thị
        setDataView(user)
    }

    // click btn delete user
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manager User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}> <FcPlus /> Add new user</button>
                </div>
                <div>
                    <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    )
}
export default ManageUser;