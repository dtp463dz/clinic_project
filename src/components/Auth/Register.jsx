
import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { postRegister } from '../../services/apiService';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [isShowPassword, setIsShowPassword] = useState(false); // false la dong

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // validate email
    const isValidateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        // validate
        if (!email || !password || !firstName || !lastName) {
            toast.error("Vui lòng nhập đầy đủ email và mật khẩu, tên và họ");
            return;
        }
        if (!isValidateEmail(email)) {
            toast.error("Email không hợp lệ, hãy thử lại");
            return;
        }
        if (password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        // call api

        try {
            let data = await postRegister(email, password, firstName, lastName)
            if (data && data.errCode === 0) {
                dispatch(doLogin(data));
                toast.success(data.errMessage);
                navigate('/home');
            }
            if (data && data.errCode !== 0) {
                toast.error(data.errMessage);
            }
        } catch (error) {
            toast.error("Lỗi kết nối đến server.");
            console.log(error);
        }
    }
    return (
        <div className="register-container">
            <div className="header">
                <span>Already have an account ?</span>
                <button className='btn-login' onClick={() => { navigate('/login') }}>Login</button>

            </div>
            <div className="title col-4 mx-auto">
                Booking Health
            </div>
            <div className="welcome col-4 mx-auto">
                Healthy Care
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className="form-group">
                    <label>Email(*)</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email} // truyen cho react quan ly
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group pass-group">
                    <label>Password</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={password} // truyen cho react quan ly
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {isShowPassword ?
                        <span className='icons-eye' onClick={() => setIsShowPassword(false)}>
                            <FaRegEye />
                        </span>
                        :
                        <span className='icons-eye' onClick={() => setIsShowPassword(true)}>
                            <FaRegEyeSlash />
                        </span>
                    }
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={firstName} // truyen cho react quan ly
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={lastName} // truyen cho react quan ly
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>
                <div>
                    <button
                        className="btn-submit"
                        onClick={() => handleRegister()}
                    >Create my free account</button>
                </div>
                <div className='text-center'>
                    <span className="back" onClick={() => { navigate('/') }}>
                        &#60;&#60; Go to Homepage
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register;