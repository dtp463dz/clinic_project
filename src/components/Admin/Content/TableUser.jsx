import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/apiService";

const TableUser = (props) => {
    const { listUsers } = props;

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop list users dung map */}
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            // console.log('check item: ', item)
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.roleId}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => props.handleClickBtnView(item)}
                                        >Xem</button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(item)}
                                        >Cập Nhật</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >Xóa</button>
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