import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNewUser, fetchAllUsersStart } from "../../../../redux/action/adminAction";
import ModalDeleteUserRedux from "./ModalDeleteUserRedux";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Pagination from "../../../Pagination/Pagination";
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


const TableManageUser = (props) => {
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const { users, currentPage, totalPages, limit, totalItems } = useSelector((state) => state.admin);
    const [userDelete, setUserDelete] = useState({});


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllUsersStart(currentPage, limit));
    }, [dispatch, currentPage, limit])

    // doi page
    const handlePageChange = (page) => {
        dispatch(fetchAllUsersStart(page, limit));
    };

    // btn delte user
    const handleDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        setUserDelete(user);
    }
    // btn edit delete user
    const handleUpdateUser = (user) => {
        props.handleEditUserFromParent(user)
    }
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Position</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 &&
                        users.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <th>{(currentPage - 1) * limit + index + 1}</th>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.positionId}</td>
                                    <td>{item.roleId}</td>
                                    <td>
                                        <button className="btn btn-secondary">Xem</button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => handleUpdateUser(item)}
                                        >Cập nhật</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteUser(item)}
                                        >Xóa</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {users && users.length === 0 &&
                        <tr>
                            <td colSpan={'9'}>
                                Not Found Data
                            </td>
                        </tr>
                    }

                </tbody>
            </table>
            <div className="total-users my-2">
                Tổng số người dùng: {totalItems}
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
            <ModalDeleteUserRedux
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                userDelete={userDelete}
            />
        </>
    )
}

export default TableManageUser;