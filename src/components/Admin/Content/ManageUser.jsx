import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import TableUser from "./TableUser";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = () => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false); // modal create
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false); // modal update 
    const [dataUpdate, setDataUpdate] = useState({});
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
                />
            </div>
        </div>
    )
}
export default ManageUser;