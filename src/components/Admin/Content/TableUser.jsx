import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/apiService";

const TableUser = () => {
    const [listUsers, setListUsers] = useState([]);
    // hàm này chạy sau khi hàm return chạy
    // componentDidMount
    useEffect(() => {
        // console.log('run second useEffect')
        // let res = await getAllUser()
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        console.log('>> check res useEffect: ', res)
        if (res.errCode === 0) {
            setListUsers(res.users)
        }
    }
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop list users dung map */}
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            console.log('check item: ', item)
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName} {item.lastName}</td>
                                    <td>{item.roleId}</td>
                                    <td>
                                        <button className="btn btn-secondary">View</button>
                                        <button className="btn btn-warning mx-3">Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {/**check nếu k có data */}
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>
                                Not found data

                            </td>
                        </tr>
                    }


                </tbody>
            </table>
        </>
    )
}
export default TableUser;