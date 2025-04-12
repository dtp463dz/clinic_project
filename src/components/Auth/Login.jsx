
import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleLogin = () => {
        toast.success('Login success')
    }
    const navigate = useNavigate();
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
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={"password"}
                        className="form-control"
                        value={password} // truyen cho react quan ly
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span className="forgot-password">Forgot password</span>
                <div>
                    <button
                        className="btn-submit"
                        onClick={() => handleLogin()}
                    >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;