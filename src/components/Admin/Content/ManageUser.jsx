import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import TableUser from "./TableUser";
const ManageUser = () => {
    return (
        <div className="manage-user-container">
            <div className="title">
                Manager User
            </div>
            <div className="user-content">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    <TableUser />
                </div>
                <ModalCreateUser />

            </div>
        </div>
    )
}
export default ManageUser;