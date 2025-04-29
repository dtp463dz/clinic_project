import { FcPlus } from "react-icons/fc";
import { getAllCodeService } from "../../../services/apiService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; // tương tự như navigate
import { fetchGenderStart, fetchPositionStart, fetchRoleIdStart } from "../../../redux/action/adminAction";

const ManageUserRedux = () => {
    const genderArr = useSelector((state) => state.admin.genders)
    const positionArr = useSelector((state) => state.admin.positions)
    const roleArr = useSelector((state) => state.admin.roles)
    const isLoadingGender = useSelector((state) => state.admin.isLoadingGender)
    const dispatch = useDispatch();
    // componentDidMount
    useEffect(() => {
        dispatch(fetchGenderStart());
        dispatch(fetchPositionStart());
        dispatch(fetchRoleIdStart());

    }, [dispatch]);

    return (
        <div className="user-redux-container">
            <div className="title h3 px-4 py-2">
                User Redux
            </div>
            <div className="user-redux-body">
                <div className="container">
                    <div className="col-5 px-3">
                        {isLoadingGender === true ? 'Loading gender' : ''}
                    </div>
                    <div className="form-row d-flex">
                        <div className="form-group col-5 px-3">
                            <label >Email</label>
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group col-5">
                            <label >Password</label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-row d-flex py-2">
                        <div className="form-group col-5 px-3 py-2">
                            <label >First Name</label>
                            <input type="text" className="form-control" placeholder="First Name" />
                        </div>
                        <div className="form-group col-5 py-2">
                            <label >Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="form-row d-flex ">
                        <div className="form-group col-3 px-3">
                            <label >Phonenumber</label>
                            <input type="text" className="form-control" placeholder="....." />
                        </div>
                        <div className="form-group col-7 ">
                            <label >Address</label>
                            <input type="text" className="form-control" placeholder="1234 Main St" />
                        </div>
                    </div>
                    <div className="form-row d-flex py-3">
                        <div className="form-group col-2 px-3">
                            <label >Gender</label>
                            <select className="form-control">
                                {genderArr && genderArr.length > 0 ? (
                                    genderArr.map((item, index) => (
                                        <option key={index} value={item.keyMap}>
                                            {item.valueEn}
                                        </option>
                                    ))
                                ) : (
                                    <option>No genders available</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group col-2 px-3">
                            <label >Position</label>
                            <select className="form-control">
                                {positionArr && positionArr.length > 0 ? (
                                    positionArr.map((item, index) => (
                                        <option key={index} value={item.keyMap}>
                                            {item.valueEn}
                                        </option>
                                    ))
                                ) : (
                                    <option>No position available</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group col-2 px-3">
                            <label >RoleId</label>
                            <select className="form-control">
                                {roleArr && roleArr.length > 0 ? (
                                    roleArr.map((item, index) => (
                                        <option key={index} value={item.keyMap}>
                                            {item.valueEn}
                                        </option>
                                    ))
                                ) : (
                                    <option>No roleId available</option>
                                )}
                            </select>
                        </div>

                    </div>
                    <div className='form-group col-md-12 px-3'>
                        <label className="form-label label-upload" htmlFor='labelUpload'>
                            <FcPlus />Upload File Image
                        </label>
                        <input
                            type="file"
                            hidden
                        />
                        <div className='col-md-12 img-preview'>
                            <span>Preview Image</span>
                        </div>
                    </div>

                    <div className="form-group px-3 mt-3">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>

                </div>

            </div>



        </div>
    )
}

export default ManageUserRedux;