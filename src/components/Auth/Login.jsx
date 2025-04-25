import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postLogin } from '../../services/apiService';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux'; // tương tự như navigate
import { doLogin } from '../../redux/action/userAction';
import { FaSpinner } from "react-icons/fa"; // icon load spinner


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShowPassword, setIsShowPassword] = useState(false); // false la dong
    const [isLoading, setIsLoading] = useState(false);

    const isValidateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    const handleLogin = async () => {
        // validate
        if (!email || !password) {
            toast.error("Vui lòng nhập đầy đủ email và mật khẩu.");
            return;
        }
        if (!isValidateEmail(email)) {
            toast.error("Email không hợp lệ.");
            return;
        }
        if (password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }
        setIsLoading(true); // trước call api thì set bằng true
        // submit api
        try {
            let data = await postLogin(email, password);
            console.log('check data login: ', data);
            if (data && data.errCode === 0) {
                dispatch(doLogin(data)) // user action 
                toast.success(data.message);
                setIsLoading(false); // sau khi call api thì false
                navigate('/');
            }
            if (data && +data.errCode !== 0) {
                toast.error(data.message);
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Lỗi kết nối đến server.");
            console.error(error);
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have account yet ?</span>
                <button className='btn-signup' onClick={() => { navigate('/register') }}>Sign up</button>
            </div>
            <div className="title col-4 mx-auto">
                Booking Health
            </div>
            <div className="welcome col-4 mx-auto">
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className="form-group">
                    <label>Email</label>
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
                <span className="forgot-password">Forgot password</span>
                <div>
                    <button
                        className="btn-submit"
                        onClick={() => handleLogin()}
                        disabled={isLoading}

                    >
                        {isLoading === true && <FaSpinner className='loader-icon' />}
                        <span>Login</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;