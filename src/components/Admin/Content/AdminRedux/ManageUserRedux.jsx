import { FcPlus } from "react-icons/fc";
import './ManageUserRedux.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; // tương tự như navigate
import { fetchGenderStart, fetchPositionStart, fetchRoleIdStart, createNewUser, fetchAllUsersStart, updateUser } from "../../../../redux/action/adminAction";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import TableManageUser from "./TableManageUser";
import { toast } from 'react-toastify';
import CommonUtils from "../../../../utils/commonUtils";
import { Buffer } from 'buffer';

const ManageUserRedux = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [position, setPosition] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    // state redux
    const genderArr = useSelector((state) => state.admin.genders)
    const positionArr = useSelector((state) => state.admin.positions)
    const roleArr = useSelector((state) => state.admin.roles)
    const isLoadingGender = useSelector((state) => state.admin.isLoadingGender)
    const dispatch = useDispatch();
    // preview image
    const [previewImage, setPreviewImage] = useState("");
    const [lightBoxOpen, setLightBoxOpen] = useState(false);
    // hide/show form create user
    const [isShowForm, setIsShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // edit mode
    const [userEditId, setUserEditId] = useState({});
    // componentDidMount
    useEffect(() => {
        dispatch(fetchGenderStart());
        dispatch(fetchPositionStart());
        dispatch(fetchRoleIdStart());
        dispatch(fetchAllUsersStart()); // all user

    }, [dispatch]);

    // Đặt giá trị mặc định cho gender, position, role khi các mảng từ Redux thay đổi
    useEffect(() => {
        if (genderArr && genderArr.length > 0) {
            const isValidGender = gender && genderArr.some((item) => item.key === gender);// hàm some check phan tu trong mang co tmdk hay ko
            if (!isValidGender) {
                setGender(genderArr[0].key); // Đặt giá trị mặc định cho gender
            }
        }

        if (positionArr && positionArr.length > 0) {
            const isValidPosition = position && positionArr.some((item) => item.key === position);
            if (!isValidPosition) {
                setPosition(positionArr[0].key); // Đặt giá trị mặc định cho position
            }
        }

        if (roleArr && roleArr.length > 0) {
            const isValidRole = role && roleArr.some((item) => item.key === role);
            if (!isValidRole) {
                setRole(roleArr[0].key); // Đặt giá trị mặc định cho role
            }
        }
    }, [genderArr, positionArr, roleArr, gender, position, role]);

    // upload hinh anh
    const handleUploadImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            // convert file to base64
            let base64 = await CommonUtils.getBase64(file);
            console.log('check image base64', base64);
            // hien thi anh dung url.createObjectUrl se chuyen sang blob
            setPreviewImage(URL.createObjectURL(file));
            setImage(base64)
        } else {

        }
    }

    // validate
    const checkValidateInput = () => {
        const fields = [
            { value: email, label: "Email" },
            { value: password, label: "Password" },
            { value: firstName, label: "First Name" },
            { value: lastName, label: "Last Name" },
            { value: phoneNumber, label: "Phone Number" },
            { value: address, label: "Address" },
        ];

        const errors = [];
        fields.forEach(({ value, label }) => {
            if (!value || value.trim() === "") {
                errors.push(`${label} không được để trống`);
            }
        });
        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errors.push("Email không đúng định dạng");
        }
        return errors;
    };

    // save user
    const handleSaveUser = () => {
        // Gọi hàm validate
        const errors = checkValidateInput();
        if (errors.length > 0) {
            toast.error(errors.join(", "));
            return;
        }
        const userData = {
            email,
            password: isEditMode ? undefined : password,
            firstName,
            lastName,
            address,
            phonenumber: phoneNumber,
            gender,
            roleId: role,
            positionId: position,
            image,
        };
        console.log('userData gửi đi:', userData); // Kiểm tra dữ liệu
        if (!isEditMode) {
            // fire redux action create
            dispatch(
                createNewUser({ userData })
            );
            toast.success('Create User Success')
        } else {
            // fire redux action update
            dispatch(updateUser({ id: userEditId, ...userData }))
            toast.success('Update User Success')
        }

        // khi nhấn btn save thì table được cập nhật và form trở về trống
        setTimeout(() => {
            dispatch(fetchAllUsersStart());
            resetForm();
        }, 1000)
    }
    // reset form
    const resetForm = () => {
        // Reset form fields
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setAddress("");
        setGender(genderArr && genderArr.length > 0 ? genderArr[0].key : "");
        setPosition(positionArr && positionArr.length > 0 ? positionArr[0].key : "");
        setRole(roleArr && roleArr.length > 0 ? roleArr[0].key : "");
        setImage("");
        setPreviewImage("");
        // hide form
        setIsShowForm(!isShowForm)
        setIsEditMode(false);
        setUserEditId('');
    }

    // show hide form
    const btnShowForm = () => {
        setIsShowForm(!isShowForm)
    }
    // view form edit user
    const handleEditUserFromParent = (user) => {
        if (!user) return;

        // Chuyển đổi ảnh từ buffer base64 sang dạng nhị phân để preview
        const imageBase64 = user.image
            ? Buffer.from(user.image, 'base64').toString('binary')
            : '';

        console.log('Thông tin user cần chỉnh sửa:', user);

        // Cập nhật thông tin form với dữ liệu từ user
        setEmail(user.email || "");
        setPassword('Hard code'); // Gán mật khẩu mặc định
        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setPhoneNumber(user.phonenumber || "");
        setAddress(user.address || "");
        setGender(user.gender || "");
        setPosition(user.positionId || "");
        setRole(user.roleId || "");

        // Xử lý ảnh và chế độ form
        setImage(""); // Reset ảnh gốc
        setPreviewImage(imageBase64); // Ảnh để hiển thị
        setIsShowForm(true); // Hiển thị form
        setIsEditMode(true); // Bật chế độ chỉnh sửa
        setUserEditId(user.id); // Lưu ID user đang chỉnh sửa
    };




    return (
        <div className="user-redux-container">
            <div className="title h3 px-4 py-2">
                User Redux
            </div>
            <div className="user-redux-body">
                <button className="btn btn-primary mb-3 mx-4" onClick={btnShowForm}>
                    {isShowForm ? "Ẩn" : "Thêm người dùng"}
                </button>
                <div className={`container ${isShowForm ? 'visible' : 'hidden'}`}>
                    <div className="col-5 px-3">
                        {isLoadingGender === true ? 'Loading gender' : ''}
                    </div>
                    <div className="form-row d-flex">
                        <div className="form-group col-5 px-3">
                            <label >Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled={isEditMode} // no update email in editmode
                            />
                        </div>
                        <div className="form-group col-5">
                            <label >Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={isEditMode} // no update password in editmode 
                            />
                        </div>
                    </div>
                    <div className="form-row d-flex py-2">
                        <div className="form-group col-5 px-3 py-2">
                            <label >First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className="form-group col-5 py-2">
                            <label >Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row d-flex ">
                        <div className="form-group col-3 px-3">
                            <label >Phonenumber</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="....."
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                            />
                        </div>
                        <div className="form-group col-7 ">
                            <label >Address</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="1234 Main St"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row d-flex py-3">
                        <div className="form-group col-2 px-3">
                            <label >Gender</label>
                            <select
                                className="form-control"
                                onChange={(event) => setGender(event.target.value)}
                                value={gender}
                            >
                                {genderArr && genderArr.length > 0 ? (
                                    genderArr.map((item, index) => (
                                        <option key={index} value={item.key}>
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
                            <select
                                className="form-control"
                                onChange={(event) => setPosition(event.target.value)}
                                value={position}
                            >
                                {positionArr && positionArr.length > 0 ? (
                                    positionArr.map((item, index) => (
                                        <option key={index} value={item.key}>
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
                            <select
                                className="form-control"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                            >
                                {roleArr && roleArr.length > 0 ? (
                                    roleArr.map((item, index) => (
                                        <option key={index} value={item.key}>
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
                            <FcPlus style={{ cursor: 'pointer' }} />Upload File Image
                        </label>
                        <input
                            type="file"
                            id="labelUpload" hidden
                            onChange={(event) => handleUploadImage(event)}
                        />
                        <div className='col-md-12 preview-image'>
                            {previewImage ?
                                <>
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        style={{ cursor: "pointer", maxWidth: "200px", maxHeight: "200px" }}
                                        onClick={() => setLightBoxOpen(true)}
                                    />
                                    <Lightbox
                                        open={lightBoxOpen}
                                        close={() => setLightBoxOpen(false)}
                                        slides={[{ src: previewImage }]}
                                    />
                                </>
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </div>

                    <div className="form-group px-3 mt-3">
                        <button
                            type="submit"
                            className={isEditMode ? "btn btn-warning" : "btn btn-primary"}
                            onClick={() => handleSaveUser()}
                        >
                            {isEditMode ? "Edit" : "Save"}
                        </button>
                    </div>

                </div>
                <div className="col-12 px-4 py-2">
                    <TableManageUser
                        handleEditUserFromParent={handleEditUserFromParent}
                    />
                </div>
            </div>
        </div>
    )
}

export default ManageUserRedux;