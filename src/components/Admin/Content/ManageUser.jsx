import ModalCreateUser from "./ModalCreateUser";

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
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}
export default ManageUser;