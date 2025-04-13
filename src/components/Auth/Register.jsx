
import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const [isShowPassword, setIsShowPassword] = useState(false); // false la dong

    const navigate = useNavigate();
    const handleRegister = () => {
        toast.success('Sign up success')
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
                    <label>User Name</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={userName} // truyen cho react quan ly
                        onChange={(event) => setUserName(event.target.value)}
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